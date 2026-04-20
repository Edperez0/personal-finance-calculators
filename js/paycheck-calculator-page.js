import { calculateTax, normalizeFilingStatus } from "./tax-tables.js";

const PERIODS_PER_YEAR = {
  biweekly: 26,
  semimonthly: 24,
  weekly: 52,
  monthly: 12,
};

/** @type {Array<{code: string, name: string}>} */
const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
].sort((a, b) => a.name.localeCompare(b.name));

/**
 * Best-guess state from IANA zone (many zones span multiple states).
 */
/** Common US IANA zones → representative state (ambiguous border areas). */
const TIMEZONE_TO_STATE = {
  "America/New_York": "NY",
  "America/Detroit": "MI",
  "America/Kentucky/Louisville": "KY",
  "America/Kentucky/Monticello": "KY",
  "America/Indiana/Indianapolis": "IN",
  "America/Indiana/Vincennes": "IN",
  "America/Indiana/Winamac": "IN",
  "America/Indiana/Marengo": "IN",
  "America/Indiana/Petersburg": "IN",
  "America/Indiana/Vevay": "IN",
  "America/Indiana/Tell_City": "IN",
  "America/Chicago": "IL",
  "America/Menominee": "WI",
  "America/North_Dakota/Center": "ND",
  "America/North_Dakota/New_Salem": "ND",
  "America/North_Dakota/Beulah": "ND",
  "America/Denver": "CO",
  "America/Boise": "ID",
  "America/Phoenix": "AZ",
  "America/Los_Angeles": "CA",
  "America/Anchorage": "AK",
  "America/Juneau": "AK",
  "America/Sitka": "AK",
  "America/Metlakatla": "AK",
  "America/Yakutat": "AK",
  "America/Nome": "AK",
  "Pacific/Honolulu": "HI",
  "America/Dawson": "AK",
  "America/Whitehorse": "AK",
  "America/Hermosillo": "AZ",
  "America/Tijuana": "CA",
  "America/Adak": "AK",
};

function guessStateFromTimeZone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_TO_STATE[tz] || null;
  } catch {
    return null;
  }
}

function formatMoney(n) {
  const x = Number(n) || 0;
  return x.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatMoneyCents(n) {
  const x = Number(n) || 0;
  return x.toLocaleString(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPct(x) {
  if (!Number.isFinite(x)) return "0%";
  return `${(x * 100).toFixed(1)}%`;
}

function getInputs() {
  const pay = Number(document.getElementById("pay-amount").value) || 0;
  const payType = document.querySelector('input[name="pay-type"]:checked')?.value || "gross";
  const freq = document.getElementById("pay-frequency").value;
  const periods = PERIODS_PER_YEAR[freq] || 26;
  const hours = Number(document.getElementById("hours-week").value) || 40;
  const state = document.getElementById("state-select").value || "CA";
  const filing = normalizeFilingStatus(document.getElementById("filing-status").value);
  const pretaxPer = Math.max(0, Number(document.getElementById("pretax-deductions").value) || 0);
  const year = Number(document.getElementById("tax-year").value) === 2025 ? 2025 : 2026;
  return { pay, payType, freq, periods, hours, state, filing, pretaxPer, year };
}

function solveGrossAnnualFromNet(targetNetAnnual, state, filing, year, pretaxAnnual) {
  let lo = Math.max(0, targetNetAnnual);
  let hi = Math.max(targetNetAnnual * 1.25, 50_000);
  for (let k = 0; k < 40; k++) {
    const { netAnnual } = calculateTax(hi, state, filing, year, pretaxAnnual);
    if (netAnnual >= targetNetAnnual - 1) break;
    hi *= 1.35;
    if (hi > 5_000_000) break;
  }
  const tol = 2;
  const maxIter = 80;
  for (let i = 0; i < maxIter; i++) {
    const mid = (lo + hi) / 2;
    const { netAnnual } = calculateTax(mid, state, filing, year, pretaxAnnual);
    if (Math.abs(netAnnual - targetNetAnnual) <= tol) return mid;
    if (netAnnual < targetNetAnnual) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function setBarWidths(federal, state, fica, gross) {
  const pct = (x) => (gross > 0 ? Math.min(100, (x / gross) * 100) : 0);
  const set = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.style.width = `${pct(v)}%`;
  };
  set("bar-federal-pct", federal);
  set("bar-state-pct", state);
  set("bar-fica-pct", fica);
}

function setEatBar(id, amount, gross) {
  const el = document.getElementById(id);
  if (!el) return;
  const w = gross > 0 ? Math.min(100, (amount / gross) * 100) : 0;
  el.style.width = `${w}%`;
}

function recalc() {
  const { pay, payType, periods, hours, state, filing, pretaxPer, year } = getInputs();
  const pretaxAnnual = pretaxPer * periods;
  const targetNetPerPeriod = pay;
  const targetNetAnnual = targetNetPerPeriod * periods;

  let grossAnnual;
  if (payType === "gross") {
    grossAnnual = pay * periods;
  } else {
    grossAnnual = solveGrossAnnualFromNet(targetNetAnnual, state, filing, year, pretaxAnnual);
  }

  const { federal, fica, state: st, totalTax, netAnnual, effectiveRate } = calculateTax(
    grossAnnual,
    state,
    filing,
    year,
    pretaxAnnual,
  );

  const hoursYear = Math.max(1, hours) * 52;
  const grossHourly = grossAnnual / hoursYear;
  const netHourly = netAnnual / hoursYear;
  const netPerPay = netAnnual / periods;
  const netMonthly = netAnnual / 12;

  const fedPct = grossAnnual > 0 ? federal / grossAnnual : 0;
  const stPct = grossAnnual > 0 ? st / grossAnnual : 0;
  const ficaPct = grossAnnual > 0 ? fica / grossAnnual : 0;

  const el = (id, text) => {
    const n = document.getElementById(id);
    if (n) n.textContent = text;
  };

  el("res-gross-hourly", formatMoneyCents(grossHourly));
  el("res-net-hourly", formatMoneyCents(netHourly));
  el("res-effective-rate", formatPct(effectiveRate));
  el("res-net-per-pay", formatMoneyCents(netPerPay));
  el("res-net-monthly", formatMoneyCents(netMonthly));
  el("res-net-annual", formatMoneyCents(netAnnual));
  el("res-gross-annual", formatMoneyCents(grossAnnual));

  // Stat-row mirrors (template-aligned IDs).
  el("stat-gross-hourly", formatMoneyCents(grossHourly));
  el("stat-net-hourly", formatMoneyCents(netHourly));
  el("stat-effective-rate", formatPct(effectiveRate));

  // 3-paycheck-months callout: extra check ≈ net per paycheck; year total ≈ 2× extra.
  el("three-paycheck-extra", formatMoney(netPerPay));
  el("three-paycheck-yearly", formatMoney(netPerPay * 2));

  setBarWidths(federal, st, fica, grossAnnual);

  el("eat-fed-amt", formatMoneyCents(federal));
  el("eat-fed-pct", formatPct(fedPct));
  el("eat-state-amt", formatMoneyCents(st));
  el("eat-state-pct", formatPct(stPct));
  el("eat-fica-amt", formatMoneyCents(fica));
  el("eat-fica-pct", formatPct(ficaPct));

  setEatBar("eat-bar-federal", federal, grossAnnual);
  setEatBar("eat-bar-state", st, grossAnnual);
  setEatBar("eat-bar-fica", fica, grossAnnual);

  const hint = document.getElementById("state-guess-hint");
  if (hint) hint.classList.add("hidden");

  if (typeof window !== "undefined" && window.lucide) window.lucide.createIcons();
}

function populateStates() {
  const sel = document.getElementById("state-select");
  if (!sel || sel.dataset.populated === "1") return;
  sel.dataset.populated = "1";
  sel.innerHTML = "";
  const guessed = guessStateFromTimeZone();
  for (const { code, name } of US_STATES) {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = name;
    sel.appendChild(opt);
  }
  if (guessed && US_STATES.some((s) => s.code === guessed)) {
    sel.value = guessed;
    const hint = document.getElementById("state-guess-hint");
    if (hint) {
      hint.textContent =
        "We pre-selected a state from your device clock—change it if your workplace is in a different state.";
      hint.classList.remove("hidden");
    }
  } else {
    sel.value = "CA";
    const hint = document.getElementById("state-guess-hint");
    if (hint) {
      hint.textContent = "We defaulted to California; pick your state for withholding estimates.";
      hint.classList.remove("hidden");
    }
  }
}

/* ============ SAVED SCENARIOS ============ */
const SCENARIOS_KEY = "tb_paycheck_scenarios";

function safeParse(str) { try { return JSON.parse(str); } catch { return null; } }
function escapeHtml(str) {
  return String(str ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function getAllScenarios() {
  const raw = localStorage.getItem(SCENARIOS_KEY);
  return raw ? safeParse(raw) || {} : {};
}

function snapshotInputs() {
  return {
    pay: Number(document.getElementById("pay-amount").value) || 0,
    payType: document.querySelector('input[name="pay-type"]:checked')?.value || "gross",
    freq: document.getElementById("pay-frequency").value,
    hours: Number(document.getElementById("hours-week").value) || 40,
    state: document.getElementById("state-select").value,
    filing: document.getElementById("filing-status").value,
    pretax: Number(document.getElementById("pretax-deductions").value) || 0,
    year: document.getElementById("tax-year").value,
  };
}

function applyInputs(s) {
  if (!s) return;
  const set = (id, v) => { const n = document.getElementById(id); if (n != null && v != null) n.value = String(v); };
  set("pay-amount", s.pay);
  set("pay-frequency", s.freq);
  set("hours-week", s.hours);
  set("state-select", s.state);
  set("filing-status", s.filing);
  set("pretax-deductions", s.pretax);
  set("tax-year", s.year);
  const radio = document.querySelector(`input[name="pay-type"][value="${s.payType || "gross"}"]`);
  if (radio) radio.checked = true;
  recalc();
}

function saveScenario(name) {
  const trimmed = (name || "").trim();
  if (!trimmed) { alert("Please enter a scenario name"); return; }
  const scenarios = getAllScenarios();
  scenarios[trimmed] = { ...snapshotInputs(), savedAt: new Date().toISOString() };
  localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
  renderScenariosList();
  const inp = document.getElementById("scenario-name");
  if (inp) inp.value = "";
}

function loadScenario(name) {
  const data = getAllScenarios()[name];
  if (data) applyInputs(data);
}

function deleteScenario(name) {
  if (!confirm(`Delete scenario "${name}"?`)) return;
  const scenarios = getAllScenarios();
  delete scenarios[name];
  localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
  renderScenariosList();
}

function renderScenariosList() {
  const list = document.getElementById("scenarios-list");
  if (!list) return;
  const scenarios = getAllScenarios();
  const names = Object.keys(scenarios);
  if (names.length === 0) {
    list.innerHTML = '<p class="scenarios-empty">No saved scenarios yet</p>';
    return;
  }
  list.innerHTML = names.map((name) => {
    const data = scenarios[name];
    const date = data.savedAt ? new Date(data.savedAt).toLocaleDateString() : "";
    const safe = name.replace(/'/g, "\\'");
    const meta = `${data.state || ""} &middot; ${data.filing || ""} &middot; ${date}`;
    return `
      <div class="scenario-item">
        <div class="scenario-info" onclick="window.tbLoadPaycheckScenario('${safe}')">
          <div class="scenario-name">${escapeHtml(name)}</div>
          <div class="scenario-meta">${meta}</div>
        </div>
        <button class="scenario-delete" onclick="event.stopPropagation(); window.tbDeletePaycheckScenario('${safe}')" aria-label="Delete scenario">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
        </button>
      </div>`;
  }).join("");
}

window.tbLoadPaycheckScenario = loadScenario;
window.tbDeletePaycheckScenario = deleteScenario;

/* ============ EXPORT CSV ============ */
function exportCsv() {
  const get = (id) => document.getElementById(id)?.textContent ?? "";
  const inputs = snapshotInputs();
  const rows = [
    ["Setting", "Value"],
    ["Pay amount", inputs.pay],
    ["Pay type", inputs.payType],
    ["Frequency", inputs.freq],
    ["Hours/week", inputs.hours],
    ["State", inputs.state],
    ["Filing status", inputs.filing],
    ["Pre-tax/paycheck", inputs.pretax],
    ["Tax year", inputs.year],
    [""],
    ["Result", "Value"],
    ["Gross hourly", get("res-gross-hourly")],
    ["Net hourly", get("res-net-hourly")],
    ["Effective tax rate", get("res-effective-rate")],
    ["Estimated gross (annual)", get("res-gross-annual")],
    ["Net per paycheck", get("res-net-per-pay")],
    ["Net monthly", get("res-net-monthly")],
    ["Net annual", get("res-net-annual")],
    ["Federal", get("eat-fed-amt")],
    ["State", get("eat-state-amt")],
    ["FICA", get("eat-fica-amt")],
  ];
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `paycheck-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
}

function wire() {
  populateStates();
  const ids = ["pay-amount", "pay-frequency", "hours-week", "state-select", "filing-status", "pretax-deductions", "tax-year"];
  for (const id of ids) {
    const n = document.getElementById(id);
    if (n) n.addEventListener("input", recalc);
    if (n) n.addEventListener("change", recalc);
  }
  document.querySelectorAll('input[name="pay-type"]').forEach((r) => r.addEventListener("change", recalc));

  document.getElementById("save-scenario")?.addEventListener("click", () => {
    saveScenario(document.getElementById("scenario-name").value);
  });
  document.getElementById("scenario-name")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") saveScenario(e.currentTarget.value);
  });
  document.getElementById("paycheck-csv")?.addEventListener("click", exportCsv);

  renderScenariosList();
  recalc();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire);
else wire();
