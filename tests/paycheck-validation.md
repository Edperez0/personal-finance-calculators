# Paycheck Calculator Validation

Cross-check `paycheck-calculator.html` outputs against established tools to confirm our
2026 federal brackets, FICA rates, and per-state withholding stay within tolerance
(±$5 / paycheck, ±0.5% effective rate). Re-run any time `js/tax-tables.js` changes or
when the LAST VERIFIED date in that file is bumped.

Reference tools:

- SmartAsset: https://smartasset.com/taxes/paycheck-calculator
- ADP: https://www.adp.com/resources/tools/calculators/salary-paycheck-calculator.aspx
- PaycheckCity: https://www.paycheckcity.com/calculator/salary

| Scenario | Inputs | My Result | SmartAsset | ADP | PaycheckCity | Consensus | Pass/Fail |
|----------|--------|-----------|------------|-----|--------------|-----------|-----------|
|          |        |           |            |     |              |           |           |
|          |        |           |            |     |              |           |           |
|          |        |           |            |     |              |           |           |
|          |        |           |            |     |              |           |           |
|          |        |           |            |     |              |           |           |

Notes:

- "Inputs" should capture state, filing status, gross/net mode, pay frequency, hours/week,
  pre-tax deductions, and tax year.
- "My Result" is the net per paycheck shown by `paycheck-calculator.html`.
- "Consensus" is the median (or simple average) of the three reference tools.
- Pass = within ±$5 of consensus AND effective rate within ±0.5 pts. Otherwise Fail and
  add a note about the suspected source (federal bracket vs state vs FICA cap).
