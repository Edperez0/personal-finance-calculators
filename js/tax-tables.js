/**
 * Client-side U.S. federal + state + FICA estimates for paycheck modeling.
 *
 * --- 2026 SOURCES (verify annually) ---
 * Federal brackets & standard deduction (2025–2026, OBBB / inflation adjustments):
 *   https://www.irs.gov/filing/federal-income-tax-rates-and-brackets/
 *   https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill
 *   Revenue Procedure 2025-32 (PDF): https://www.irs.gov/pub/irs-drop/rp-25-32.pdf
 *
 * Standard deductions (2026): Single $16,100 · MFJ $32,200 · HoH $24,150 (RP-25-32).
 *
 * FICA (2026):
 *   Social Security wage base = $184,500 (SSA Fact Sheet — Cost-of-Living Adjustment 2026)
 *     https://www.ssa.gov/cola/
 *   Social Security rate (employee) = 6.2% on wages up to wage base.
 *   Medicare rate (employee) = 1.45% on all covered wages, no cap.
 *   Additional Medicare Tax (employer withholds when wages exceed) = 0.9% above $200,000
 *     (single threshold; not adjusted for filing status at withholding):
 *     https://www.irs.gov/businesses/small-businesses-self-employed/questions-and-answers-for-the-additional-medicare-tax
 *
 * State rules: verify annually from each state's Department of Revenue (links grouped
 * by region in STATE_SOURCE_NOTE comments below).
 *
 * LAST VERIFIED: 2026-04-10
 * RE-VERIFY: each November (after IRS RP for next tax year and SSA COLA release).
 *   Action items at re-verify time:
 *     1. Update FEDERAL_BRACKETS for the new year.
 *     2. Update STD_DEDUCTION amounts for Single / MFJ / MFS / HoH.
 *     3. Update SS_WAGE_BASE constant.
 *     4. Update ADDITIONAL_MEDICARE_THRESHOLD if changed (rare).
 *     5. Spot-check 2–3 high-traffic states (CA, NY, TX) for bracket changes.
 *     6. Bump LAST VERIFIED date above and re-run /tests/paycheck-validation.md.
 */

/** @typedef {'single'|'mfj'|'mfs'|'hoh'} FilingStatus */
/** @typedef {2025|2026} TaxYear */

/** Marginal rates (same 7 brackets for ordinary income under TCJA/OBBB). */
const RATES = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];

/**
 * Upper inclusive bounds of each bracket slice (last must be Infinity).
 * Source: IRS IR-2025-103 / RP-25-32 (2026); IRS 2025 tables (2025).
 */
export const FEDERAL_BRACKETS = {
  2025: {
    single: [11925, 48475, 103350, 197300, 250525, 626350, Infinity],
    mfj: [23850, 96950, 206700, 394600, 501050, 751600, Infinity],
    mfs: [11925, 48475, 103350, 197300, 250525, 626350, Infinity],
    hoh: [17000, 64850, 103350, 197300, 250500, 626350, Infinity],
  },
  2026: {
    single: [12400, 50400, 105700, 201775, 256225, 640600, Infinity],
    mfj: [24800, 100800, 211400, 403550, 512450, 768700, Infinity],
    mfs: [12400, 50400, 105700, 201775, 256225, 640600, Infinity],
    // 2026 HoH: Tax Foundation / finance pubs aligned to RP-25-32; verify vs IRS PDF when updating.
    hoh: [17850, 67650, 107650, 204100, 259200, 640550, Infinity],
  },
};

/** Standard deduction (OBBB amounts per IRS newsroom IR-2025-103). */
export const STANDARD_DEDUCTION = {
  2025: { single: 15750, mfj: 31500, mfs: 15750, hoh: 23625 },
  2026: { single: 16100, mfj: 32200, mfs: 16100, hoh: 24150 },
};

/** Social Security OASDI wage base — IRS / SSA announcements. */
export const SS_WAGE_BASE = {
  2025: 176100,
  2026: 184500, // SSA/IRS 2026 wage base announcement
};

const SS_RATE = 0.062;
const MEDICARE_RATE = 0.0145;
const ADDL_MEDICARE_RATE = 0.009;

/** Additional Medicare withholding thresholds (wages before pre-tax reductions for this estimator). */
export const ADDL_MEDICARE_WAGES = {
  single: 200000,
  mfj: 250000,
  mfs: 125000,
  hoh: 200000,
};

function progressiveTax(taxable, caps, rates = RATES) {
  if (taxable <= 0) return 0;
  let tax = 0;
  let prev = 0;
  for (let i = 0; i < rates.length; i++) {
    const cap = caps[i];
    const slice = Math.max(0, Math.min(taxable, cap) - prev);
    if (slice > 0) tax += slice * rates[i];
    prev = cap;
    if (taxable <= cap) break;
  }
  return Math.round(tax * 100) / 100;
}

function federalIncomeTax(taxableIncome, year, filing) {
  const caps = FEDERAL_BRACKETS[year]?.[filing];
  if (!caps) return 0;
  return progressiveTax(taxableIncome, caps);
}

/**
 * State income tax — simplified models. Update from state DOR sites before each tax year.
 * Regional hub examples:
 *   Multistate: https://taxfoundation.org/data/all/state/2026-income-tax-rates-and-brackets/
 *   CA FTB: https://www.ftb.ca.gov/
 *   NY: https://www.tax.ny.gov/
 *   NJ: https://www.nj.gov/treasury/taxation/
 *   PA: https://www.revenue.pa.gov/
 */
const STATE_SOURCE_NOTE =
  "Verify 2026+ rates at each state's Department of Revenue; many states use federal AGI with modifications — this module taxes a simplified wage base only.";

/** @typedef {{ kind: 'none' }} NoneState */
/** @typedef {{ kind: 'flat', rate: number, note?: string }} FlatState */
/** @typedef {{ kind: 'progressive', caps: number[], rates: number[], note?: string }} ProgState */

/** @type {Record<string, NoneState | FlatState | ProgState>} */
export const STATE_TAX = {
  // No general wage income tax (verify NH investment tax / TN historical nuances)
  AK: { kind: "none" },
  FL: { kind: "none" },
  NV: { kind: "none" },
  NH: { kind: "none" }, // No tax on wages; interest/dividends outside scope
  SD: { kind: "none" },
  TN: { kind: "none" },
  TX: { kind: "none" },
  WA: { kind: "none" }, // WA capital gains tax / PFML not modeled
  WY: { kind: "none" },

  // Flat / near-flat (rates rounded; see state DOR)
  AZ: { kind: "flat", rate: 0.025, note: "AZ DOR — flat 2.5% post-2023 reform" },
  CO: { kind: "flat", rate: 0.044, note: "CO DOR flat rate" },
  GA: { kind: "flat", rate: 0.0539, note: "GA transitioning to flat; verify year" },
  ID: { kind: "flat", rate: 0.057, note: "ID flat" },
  IL: { kind: "flat", rate: 0.0495, note: "IL flat" },
  IN: { kind: "flat", rate: 0.0305, note: "IN state only; county surtax not modeled" },
  KY: { kind: "flat", rate: 0.04, note: "KY state rate; local occupational taxes not modeled" },
  MI: { kind: "flat", rate: 0.0425, note: "MI flat" },
  MS: { kind: "flat", rate: 0.05, note: "MS flat 2023+ reform" },
  NC: { kind: "flat", rate: 0.0425, note: "NC flat" },
  PA: { kind: "flat", rate: 0.0307, note: "PA personal income tax; local EIT not modeled" },
  UT: { kind: "flat", rate: 0.0455, note: "UT flat" },

  // Simplified multi-bracket (APPROX — replace with official DOR brackets when updating)
  AL: { kind: "progressive", caps: [500, 3000, 12000, 25000, Infinity], rates: [0.02, 0.04, 0.05, 0.05, 0.05], note: "APPROX AL brackets" },
  AR: { kind: "progressive", caps: [4300, 8500, 14300, 24200, Infinity], rates: [0.02, 0.04, 0.059, 0.059, 0.059], note: "APPROX AR" },
  CA: {
    kind: "progressive",
    caps: [10412, 24684, 38959, 54081, 68350, 349137, 418961, 698271, Infinity],
    rates: [0.01, 0.02, 0.04, 0.06, 0.08, 0.093, 0.103, 0.113, 0.123],
    note: "CA FTB-style graduated approx; verify annual FTB tables",
  },
  CT: { kind: "progressive", caps: [10000, 50000, 100000, 200000, 250000, 500000, Infinity], rates: [0.03, 0.05, 0.055, 0.06, 0.065, 0.069, 0.0699], note: "APPROX CT" },
  DE: { kind: "progressive", caps: [2000, 5000, 10000, 20000, 25000, 60000, Infinity], rates: [0.022, 0.039, 0.048, 0.052, 0.0555, 0.066, 0.066], note: "APPROX DE" },
  HI: { kind: "progressive", caps: [2400, 4800, 9600, 14400, 19200, 24000, 36000, 48000, 150000, Infinity], rates: [0.014, 0.032, 0.055, 0.064, 0.068, 0.072, 0.076, 0.079, 0.0825, 0.11], note: "APPROX HI" },
  IA: { kind: "progressive", caps: [1740, 3480, 6960, 15690, 26150, 34870, 52245, 69730, Infinity], rates: [0.0033, 0.0067, 0.0225, 0.0414, 0.0563, 0.0596, 0.0625, 0.0744, 0.0853], note: "IA approximate" },
  KS: { kind: "progressive", caps: [15000, 30000, 45000, 60000, 75000, 150000, Infinity], rates: [0.031, 0.0525, 0.057, 0.06, 0.0625, 0.0645, 0.057], note: "APPROX KS" },
  LA: { kind: "progressive", caps: [12500, 50000, 100000, Infinity], rates: [0.0185, 0.035, 0.0425, 0.0425], note: "APPROX LA" },
  MD: { kind: "progressive", caps: [1000, 2000, 3000, 100000, 125000, 150000, 250000, Infinity], rates: [0.02, 0.03, 0.0375, 0.0475, 0.05, 0.0525, 0.055, 0.0575], note: "MD state only; county piggyback not modeled" },
  ME: { kind: "progressive", caps: [24500, 58050, 77300, 116300, Infinity], rates: [0.058, 0.0675, 0.0715, 0.0745, 0.0745], note: "APPROX ME" },
  MN: { kind: "progressive", caps: [30170, 98760, 163390, 273150, Infinity], rates: [0.0535, 0.068, 0.0785, 0.0985, 0.0985], note: "MN approximate" },
  MO: { kind: "progressive", caps: [1121, 2242, 3363, 4484, 5605, 6726, 7847, 8968, Infinity], rates: [0.0, 0.015, 0.02, 0.025, 0.03, 0.035, 0.04, 0.045, 0.0495], note: "APPROX MO taxable ladder" },
  MT: { kind: "progressive", caps: [20500, Infinity], rates: [0.049, 0.059], note: "APPROX MT" },
  ND: { kind: "progressive", caps: [48475, 209425, 458350, Infinity], rates: [0.0195, 0.025, 0.0295, 0.0295], note: "APPROX ND" },
  NE: { kind: "progressive", caps: [3700, 8840, 14140, 22620, 36380, Infinity], rates: [0.0246, 0.0351, 0.0501, 0.064, 0.0664, 0.0664], note: "APPROX NE" },
  NJ: {
    kind: "progressive",
    caps: [20000, 35000, 40000, 75000, 500000, 1000000, Infinity],
    rates: [0.014, 0.0175, 0.035, 0.05525, 0.0637, 0.0897, 0.1075],
    note: "NJ approximate; verify NJ Division of Taxation",
  },
  NM: { kind: "progressive", caps: [5500, 11000, 16500, 21000, 115000, 315000, Infinity], rates: [0.017, 0.032, 0.047, 0.049, 0.049, 0.059, 0.059], note: "APPROX NM" },
  NY: {
    kind: "progressive",
    caps: [8500, 11700, 13900, 80650, 215400, 1077550, 5000000, Infinity],
    rates: [0.04, 0.045, 0.0525, 0.059, 0.0633, 0.0685, 0.0965, 0.103],
    note: "NY state only; NYC/Yonkers not modeled — verify tax.ny.gov",
  },
  OH: { kind: "progressive", caps: [26050, 92150, 115300, Infinity], rates: [0.0, 0.02765, 0.03226, 0.03226], note: "OH brackets approximate" },
  OK: { kind: "progressive", caps: [1000, 2500, 3750, 4900, 7200, Infinity], rates: [0.0025, 0.0075, 0.0175, 0.0175, 0.0175, 0.0475], note: "APPROX OK" },
  OR: { kind: "progressive", caps: [4050, 10150, 125000, Infinity], rates: [0.0475, 0.0675, 0.0875, 0.099], note: "OR approximate" },
  RI: { kind: "progressive", caps: [68200, 155050, Infinity], rates: [0.0375, 0.0475, 0.0599], note: "APPROX RI" },
  SC: { kind: "progressive", caps: [3200, 16040, Infinity], rates: [0.0, 0.03, 0.065], note: "SC approximate incl. effective rate on lower bands" },
  VA: { kind: "progressive", caps: [3000, 5000, 17000, 40000, 80000, 550000, Infinity], rates: [0.02, 0.03, 0.05, 0.0575, 0.06, 0.061, 0.0575], note: "APPROX VA" },
  VT: { kind: "progressive", caps: [42150, 102200, 213150, Infinity], rates: [0.0335, 0.066, 0.076, 0.0875], note: "VT approximate" },
  WI: { kind: "progressive", caps: [12760, 25520, 280950, Infinity], rates: [0.035, 0.044, 0.053, 0.0765], note: "WI approximate" },
  WV: { kind: "progressive", caps: [10000, 25000, 40000, 55000, Infinity], rates: [0.022, 0.03, 0.034, 0.047, 0.055], note: "APPROX WV" },

  // Flat APPROX fallback states not listed above (verify DOR)
  MA: { kind: "flat", rate: 0.05, note: "MA flat tax on earned income class approx; verify surtax" },
};

// Fill any missing US + DC codes with conservative flat APPROX (Tax Foundation–style ballpark)
const ALL_CODES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];
for (const code of ALL_CODES) {
  if (!STATE_TAX[code]) {
    STATE_TAX[code] = { kind: "flat", rate: 0.045, note: `APPROX flat placeholder for ${code} — replace with official DOR brackets` };
  }
}

// Fix DC top bracket rate typo in progressive array (0.0105 invalid) — use DC approximate
STATE_TAX.DC = {
  kind: "progressive",
  caps: [10000, 40000, 60000, 250000, 500000, 1000000, Infinity],
  rates: [0.04, 0.065, 0.085, 0.0925, 0.0975, 0.105, 0.1075],
  note: "DC OTR approximate",
};

function stateIncomeTax(income, stateCode) {
  const def = STATE_TAX[stateCode];
  if (!def || def.kind === "none") return 0;
  if (def.kind === "flat") return Math.round(income * def.rate * 100) / 100;
  if (def.kind === "progressive") return progressiveTax(income, def.caps, def.rates);
  return 0;
}

/**
 * @param {number} grossAnnual - Box wages before pre-tax deferrals for Medicare addl threshold logic
 * @param {string} state - Two-letter code + DC
 * @param {FilingStatus} filingStatus
 * @param {TaxYear} year
 * @param {number} [pretaxAnnual=0] - Traditional 401k-style deferrals (reduces federal taxable & SS/Medicare wages in this v1)
 */
export function calculateTax(grossAnnual, state, filingStatus, year, pretaxAnnual = 0) {
  const y = year === 2025 ? 2025 : 2026;
  const filing = filingStatus;
  const pretax = Math.max(0, pretaxAnnual);
  const wagesNetOfPretax = Math.max(0, grossAnnual - pretax);
  const std = STANDARD_DEDUCTION[y][filing] ?? STANDARD_DEDUCTION[y].single;
  const federalTaxable = Math.max(0, wagesNetOfPretax - std);
  const federal = federalIncomeTax(federalTaxable, y, filing);

  const ssCap = SS_WAGE_BASE[y];
  const ssWages = Math.min(ssCap, wagesNetOfPretax);
  const ss = Math.round(ssWages * SS_RATE * 100) / 100;

  const medWages = wagesNetOfPretax;
  const medicare = Math.round(medWages * MEDICARE_RATE * 100) / 100;
  const addlThresh = ADDL_MEDICARE_WAGES[filing] ?? ADDL_MEDICARE_WAGES.single;
  const addlBase = Math.max(0, grossAnnual - addlThresh);
  const addlMedicare = Math.round(addlBase * ADDL_MEDICARE_RATE * 100) / 100;
  const fica = Math.round((ss + medicare + addlMedicare) * 100) / 100;

  const st = stateIncomeTax(wagesNetOfPretax, String(state).toUpperCase());
  const totalTax = Math.round((federal + fica + st) * 100) / 100;
  const netAnnual = Math.round((grossAnnual - pretax - totalTax) * 100) / 100;
  const effectiveRate = grossAnnual > 0 ? Math.round((totalTax / grossAnnual) * 10000) / 10000 : 0;

  return { federal, fica, state: st, totalTax, netAnnual, effectiveRate, _meta: STATE_SOURCE_NOTE };
}

export function normalizeFilingStatus(value) {
  const v = String(value || "").toLowerCase();
  if (v === "married-joint" || v === "mfj" || v === "married filing jointly") return "mfj";
  if (v === "married-separate" || v === "mfs" || v === "married filing separately") return "mfs";
  if (v === "head" || v === "hoh" || v === "head of household") return "hoh";
  return "single";
}
