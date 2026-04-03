# 💰 Personal Finance Calculators

A suite of powerful, privacy-focused financial planning tools. All calculators run 100% in your browser—no server uploads, no accounts, no tracking. Take control of your finances with professional-grade tools that respect your privacy.

![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📊 Available Calculators

### 🏠 [Budget Planner](index.html) (Landing Page)
- **Bi-weekly to monthly conversion**: Enter your actual paycheck amount
- **Drag-and-drop expense reordering**: Organize categories your way
- **Real-time budget tracking**: See spending vs income instantly
- **Auto-save**: Never lose your budget data

### 🎓 [Student Loan Payoff Calculator](student-loans.html)
- **Daily interest accrual**: More accurate than monthly calculations
- **Avalanche vs Snowball comparison**: Find your optimal payoff strategy
- **Bonus injection modeling**: Plan for tax refunds and windfalls
- **CSV export**: Download complete payment schedules

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

### 🧭 **Unified Navigation**
- Seamless hamburger menu navigation between all calculators
- Each tool maintains independent localStorage
- Switch tools without losing any data
- Consistent design across all calculators

---

## 🚀 Quick Start

1. **Open**: `index.html` in any modern browser (Budget Planner loads first)
2. **Choose Your Tool**: Use the hamburger menu (☰) to navigate between calculators
3. **Enter Your Data**: All tools auto-save as you type
4. **Export Results**: Download CSV reports or print directly from your browser

### Example: Complete Financial Picture

**Budget Planner:**
```
Bi-weekly take-home: $2,100
Monthly equivalent: $4,550
Total expenses: $3,800
Remaining: $750/month for debt payoff
```

**Student Loan Calculator:**
```
Loan 1: $30,000 @ 5.5% APR, $175 bi-weekly
Loan 2: $15,000 @ 6.8% APR, $100 bi-weekly  
Extra from budget: $325 bi-weekly bonus

Result: Paid off in 7.4 years, $7,892 total interest
Avalanche saves $421 vs Snowball
```

---

## 📖 How It Works

### Budget Planner
The budget calculator converts bi-weekly paychecks to monthly equivalents using the accurate formula:

```
Monthly Net Pay = (Bi-weekly Pay × 26) / 12
```

This accounts for the fact that there are 26 bi-weekly pay periods per year (not 24), giving you a true monthly average. Expenses can be reordered via drag-and-drop to prioritize categories, and all data persists automatically in your browser.

### Student Loan Calculator

#### Daily Interest Calculation
Unlike simple calculators that use monthly interest, this tool calculates interest **daily** (365.25 days/year) for maximum accuracy:

```
Daily Interest = Balance × (APR / 100) / 365.25
```

This matches how real loans accrue interest and provides precise projections.

#### Payment Application
1. **Interest accrues daily** on all loans
2. **Scheduled payments** apply on their due dates (every 14 days for bi-weekly, 30 days for monthly)
3. **Bonuses** apply on their schedule and target highest APR loans first (avalanche method)
4. **Loans paid off** stop accruing interest immediately

#### Avalanche vs Snowball
- **Avalanche**: Extra payments go to the highest APR loan, minimizing total interest
- **Snowball**: Extra payments go to the smallest balance, providing psychological wins
- **Calculator shows both** so you can make an informed choice

---

## 🎯 Use Cases

### Getting Your Finances in Order
**Start with Budget Planner:**
- See exactly where your money goes each month
- Identify how much you can allocate to debt payoff
- Organize expenses by priority with drag-and-drop
- Track spending vs income in real-time

**Then use Student Loan Calculator:**
- Model different payment amounts using budget surplus
- Test "what if" scenarios (e.g., "What if I pay an extra $100/month?")
- Compare bi-weekly vs monthly payment strategies

### Tax Season Planning
**Budget Planner:** Adjust for seasonal income changes
**Loan Calculator:**
- Plan how to allocate your tax refund
- See exactly how much a one-time payment accelerates payoff
- Model quarterly bonus injections from side income

### Making Financial Decisions
**Refinancing Analysis:**
- Calculate current payoff timeline and total interest
- Compare with refinancing offers (manually adjust APR)
- See if lower rates justify refinancing costs

**Debt-Free Goal Setting:**
- Set a target payoff date
- Calculate required monthly payment to hit your goal
- Use budget planner to find areas to cut expenses
- Track progress by updating balances as you pay down loans

---

## 🛠️ Features Deep Dive

### Budget Planner Features

**Drag-and-Drop Reordering:**
- Click and drag any expense category to reorder
- Prioritize your most important expenses at the top
- Order is automatically saved

**Real-Time Calculations:**
- Budget usage percentage with color-coded progress bar
- Green (0-75%): Healthy budget
- Orange (75-100%): Approaching limit
- Red (>100%): Over budget—time to adjust

**Auto-Save:**
- Every change saves instantly to localStorage
- Close and reopen anytime—your budget persists
- No manual save button needed

### Student Loan Calculator Features

**Managing Multiple Loans:**
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

### Architecture
- **Multi-page application**: Each calculator is a separate HTML file
- **Shared navigation**: Unified hamburger menu (`assets/js/navigation.js`)
- **Independent data**: Each tool uses separate localStorage keys
- **No build process**: Pure HTML/CSS/JS—works offline

### Built With
- **Vanilla JavaScript**: No frameworks—fast and lightweight
- **Tailwind CSS**: Modern, responsive design via CDN
- **Lucide Icons**: Lightweight icon library
- **Chart.js**: Interactive payoff visualization (loan calculator)
- **localStorage API**: Client-side data persistence

### File Structure
```
personal-finance-calculators/
├── index.html              # Budget Planner (landing page)
├── student-loans.html      # Student Loan Calculator
├── assets/
│   └── js/
│       └── navigation.js   # Shared hamburger menu
└── README.md
```

### Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (responsive design)

### Data Storage
- Uses browser `localStorage` (5-10MB available)
- Each calculator has independent storage:
  - Budget: `budget_planner_state_v1`
  - Loans: `student_loan_calculator_state_v2`, `student_loan_scenarios_v2`
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

Contributions welcome! Ideas for new calculators and features:

### New Calculator Ideas:
- 🏡 Mortgage affordability calculator
- 💳 Credit card payoff planner
- 📈 Investment compound interest calculator
- 🚗 Auto loan vs lease comparison
- 💼 Retirement savings tracker

### Feature Improvements:
- PDF export with charts and summary reports
- Payment strategy optimizer (suggest optimal amounts)
- Federal IDR (Income-Driven Repayment) calculator
- PSLF (Public Service Loan Forgiveness) tracker
- Tax deduction estimator
- Data import from CSV files
- Dark mode toggle

---

## 📄 License

MIT License - Free to use, modify, and distribute.

---

## 🙋 FAQ

**Q: Is my data secure?**  
A: Yes! All calculations happen in your browser. Nothing is sent to any server. Your financial data stays 100% private on your device.

**Q: Do the calculators share data with each other?**  
A: No, each calculator has independent localStorage. This keeps your data organized and prevents conflicts.

**Q: Can I use the loan calculator for other types of debt?**  
A: Yes! Works for any installment loan: car loans, personal loans, mortgages (though mortgage calculators have specialized features like escrow).

**Q: Why are loan results different from my servicer's website?**  
A: This calculator uses daily interest accrual, which is more accurate. Servicer calculators often use simplified monthly calculations or may include fees not modeled here.

**Q: What if I can't afford my current payments?**  
A: The loan calculator will warn you if payments don't cover interest (interest-only or negative amortization). Consider income-driven repayment plans or refinancing.

**Q: Can I save my data permanently?**  
A: Data is saved in your browser's localStorage. To back up, export to CSV (loan calculator) or take screenshots. Clearing browser data will erase saved information.

**Q: Why does the budget use bi-weekly pay?**  
A: Many people are paid bi-weekly (every 2 weeks = 26 paychecks/year). The calculator converts this to monthly for expense planning: (Bi-weekly × 26) ÷ 12.

**Q: Does bi-weekly loan payment really save money?**  
A: Yes! Bi-weekly payments result in 26 payments/year (13 months) vs 12 monthly payments, plus interest accrues less frequently.

---

## 📞 Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Questions**: Open a discussion on the repository

---

## 🎉 Acknowledgments

Built for anyone working toward financial freedom and better money management. Whether you're budgeting your first paycheck or strategizing your final loan payment, these tools are here to help. 💪

---

**Made with ❤️ for your financial journey**
