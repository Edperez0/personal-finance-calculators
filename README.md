# 🎓 Student Loan Payoff Calculator

A powerful, privacy-focused student loan calculator that uses **daily interest accrual** for accurate payoff projections. Compare payment strategies, save multiple scenarios, and export your payment schedule—all while keeping your data 100% private in your browser.

![Student Loan Calculator](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Key Features

### 💾 **Auto-Save & Scenarios**
- **Automatic Persistence**: Your data is saved instantly with every change using localStorage
- **Multiple Scenarios**: Save and switch between different payoff plans (e.g., "Aggressive Plan", "Conservative Budget")
- **Never Lose Progress**: Close and reopen anytime—your loans, payments, and bonuses are always there

### 📊 **Advanced Calculation**
- **Daily Interest Accrual**: More accurate than monthly calculations—mimics how loans actually work
- **Bi-Weekly vs Monthly Payments**: Compare how payment frequency impacts total interest
- **Bonus Injections**: Model tax refunds, work bonuses, or windfalls with customizable frequencies (weekly, bi-weekly, monthly, quarterly)
- **40-Year Simulation**: Catches problematic interest-only or negatively amortizing loans

### 💰 **Strategy Comparison**
- **Avalanche Method**: Pay highest APR first (minimizes interest—mathematically optimal)
- **Snowball Method**: Pay smallest balance first (psychological quick wins)
- **Side-by-Side Results**: See exactly how much each strategy saves and which pays off faster
- **Smart Recommendations**: Get personalized advice based on your loan portfolio

### 📥 **Export & Share**
- **CSV Export**: Download full payment schedule for Excel/Google Sheets
- **PDF Export**: Coming soon—professional reports with charts
- **Print-Friendly**: Use browser print (Ctrl+P / Cmd+P) for immediate reports

### 🔒 **100% Private**
- All calculations run in your browser
- No data sent to servers
- No account required
- No tracking (except optional Google Analytics for site improvements)

---

## 🚀 Quick Start

### Try It Now
1. **Open**: `index.html` in any modern browser
2. **Enter Your Loans**: Add balance, APR, and payment amount
3. **Add Bonuses** (Optional): Model extra payments like tax refunds
4. **See Results**: Instant payoff date, total interest, and payment schedule

### Example Scenario
```
Loan 1: $30,000 @ 5.5% APR, $175 bi-weekly
Loan 2: $15,000 @ 6.8% APR, $100 bi-weekly
Bonus: $500 quarterly (tax refund)

Result: Paid off in 8.2 years, $8,423 total interest
Avalanche saves $347 vs Snowball
```

---

## 📖 How It Works

### Daily Interest Calculation
Unlike simple calculators that use monthly interest, this tool calculates interest **daily** (365.25 days/year) for maximum accuracy:

```
Daily Interest = Balance × (APR / 100) / 365.25
```

This matches how real loans accrue interest and provides precise projections.

### Payment Application
1. **Interest accrues daily** on all loans
2. **Scheduled payments** apply on their due dates (every 14 days for bi-weekly, 30 days for monthly)
3. **Bonuses** apply on their schedule and target highest APR loans first (avalanche method)
4. **Loans paid off** stop accruing interest immediately

### Avalanche vs Snowball
- **Avalanche**: Extra payments go to the highest APR loan, minimizing total interest
- **Snowball**: Extra payments go to the smallest balance, providing psychological wins
- **Calculator shows both** so you can make an informed choice

---

## 🎯 Use Cases

### Planning Your Payoff
- Model different payment amounts to see impact on payoff date
- Test "what if" scenarios (e.g., "What if I pay an extra $100/month?")
- Compare bi-weekly vs monthly payment strategies

### Tax Season
- Plan how to allocate your tax refund
- See exactly how much a one-time payment accelerates payoff
- Model quarterly bonus injections

### Refinancing Decisions
- Calculate current payoff timeline and total interest
- Compare with refinancing offers (manually adjust APR)
- See if lower rates justify refinancing costs

### Debt-Free Goal Setting
- Set a target payoff date
- Calculate required monthly payment to hit your goal
- Track progress by updating balances as you pay down loans

---

## 🛠️ Features Deep Dive

### Managing Multiple Loans
- Click **"+ Add Another Loan"** to add up to 20+ loans
- Each loan tracks independently with its own APR and payment schedule
- Delete loans with the × button
- All loans automatically save

### Bonus Injections
- Add recurring bonuses (quarterly bonuses, annual tax refunds)
- Add one-time payments (inheritance, side hustle income)
- Bonuses automatically apply to highest APR loan first for maximum benefit
- Track exactly how bonuses accelerate your payoff

### Saved Scenarios
- Save current setup with a name (e.g., "Aggressive 2026")
- Load any saved scenario with one click
- Compare different strategies by switching between scenarios
- Delete old scenarios you no longer need

### Exporting Data
- **CSV Export**: Download complete payment schedule
  - Columns: Month, Balance, Interest Paid, Principal Paid, Bonus Payments
  - Import into Excel, Google Sheets, or any spreadsheet tool
- **Print**: Use browser print for immediate PDF reports

---

## 🔧 Technical Details

### Built With
- **Vanilla JavaScript**: No frameworks—fast and lightweight
- **Tailwind CSS**: Modern, responsive design via CDN
- **Chart.js**: Interactive payoff visualization
- **localStorage API**: Client-side data persistence

### Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (responsive design)

### File Size
- Single HTML file: ~25KB
- No dependencies to install
- Loads instantly even on slow connections

### Data Storage
- Uses browser `localStorage` (5-10MB available)
- Data persists until you clear browser data
- Each browser/device stores independently
- Export to CSV for backup

---

## 📱 Mobile Support

Fully responsive design optimized for:
- 📱 **Phones**: Touch-friendly inputs, collapsible sections
- 💻 **Tablets**: Side-by-side loan comparison
- 🖥️ **Desktops**: Full feature set with large data table

---

## 🤝 Contributing

Contributions welcome! Ideas for improvement:
- PDF export with charts and summary
- Payment strategy optimizer (suggest optimal payment amounts)
- Refinancing calculator module
- Tax deduction tracker
- Integration with loan servicer APIs

---

## 📄 License

MIT License - Free to use, modify, and distribute.

---

## 🙋 FAQ

**Q: Is my data secure?**  
A: Yes! All calculations happen in your browser. Nothing is sent to any server. Your loan data stays 100% private.

**Q: Can I use this for other types of debt?**  
A: Yes! Works for any installment loan: car loans, personal loans, mortgages (though mortgage calculators have specialized features like escrow).

**Q: Why are the results different from my loan servicer's website?**  
A: This calculator uses daily interest accrual, which is more accurate. Servicer calculators often use simplified monthly calculations or may include fees not modeled here.

**Q: What if I can't afford my current payments?**  
A: The calculator will warn you if payments don't cover interest (interest-only or negative amortization). Consider income-driven repayment plans or refinancing.

**Q: Can I save my data permanently?**  
A: Data is saved in your browser's localStorage. To back up, export to CSV or bookmark scenarios. Clearing browser data will erase saved loans.

**Q: Does bi-weekly really save money?**  
A: Yes! Bi-weekly payments result in 26 payments/year (13 months) vs 12 monthly payments, plus interest accrues less frequently.

---

## 📞 Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Questions**: Open a discussion on the repository

---

## 🎉 Acknowledgments

Built for anyone working toward financial freedom. Pay off those loans! 💪

---

**Made with ❤️ for the debt-free journey**
