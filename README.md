# 💰 Personal Finance Calculators

A collection of three powerful financial planning tools that run **100% locally on your computer**. No internet required, no accounts, no cloud storage—just open the files in your browser and start planning your finances with complete privacy.

![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Local](https://img.shields.io/badge/Hosting-Local-green)

---

## 🏠 Hosted Locally

**What does "hosted locally" mean?**
- All files run directly on your computer
- Your financial data **never leaves your device**
- Works **offline** (no internet needed after initial download)
- Data saved in your **browser's localStorage** (stays on your machine)
- No servers, no databases, no cloud uploads
- **100% private** - only you can see your information

---

## 📊 What's Included

This suite includes **three financial calculators**:

### 1. 💵 Budget Planner
**What it does:** Converts your bi-weekly paycheck into a monthly budget and tracks your expenses.

**Use it for:**
- Planning your monthly spending when you're paid every 2 weeks
- Tracking categories like rent, groceries, savings, etc.
- Seeing if you're over or under budget in real-time
- Finding extra money to put toward debt or savings

### 2. 💸 Commission Breakdown
**What it does:** Splits commission checks into percentage-based buckets (e.g., 40% to loans, 35% to fun money, 25% to savings).

**Use it for:**
- Planning how to allocate bonuses or commissions
- Ensuring percentages add up to 100%
- Consistent money management for irregular income

### 3. 🎓 Student Loan Payoff Calculator
**What it does:** Calculates exactly when your student loans will be paid off using **daily interest calculations** (the most accurate method).

**Use it for:**
- Seeing your debt-free date
- Comparing bi-weekly vs monthly payments
- Planning bonus payments (tax refunds, work bonuses)
- Testing "what if" scenarios (e.g., "What if I pay an extra $100/month?")
- Choosing between Avalanche (highest interest first) or Snowball (smallest balance first) strategies

---

## ✨ Key Features

### 💾 Auto-Save
Every change is automatically saved to your browser. Close and reopen anytime—your data persists.

### 🔒 100% Private
All calculations run on your computer. No servers, no uploads, no accounts, no tracking.

### 📊 Accurate Math
- **Budget:** True bi-weekly to monthly conversion (26 paychecks/year)
- **Loans:** Daily interest accrual (matches real loan behavior)
- **Commission:** Percentage-based allocation with validation

### 🎯 Multiple Strategies
Compare Avalanche (highest interest first) vs Snowball (smallest balance first) to find your optimal debt payoff method.

### 📥 Export Your Data
Download payment schedules as CSV or print directly from your browser.

### 🧭 Easy Navigation
Hamburger menu (☰) in the top-right corner lets you switch between all three calculators instantly.

---

---

## 🚀 How to Use (3 Simple Steps)

### Step 1: Open the Files
1. Download/clone this repository to your computer
2. Navigate to the folder: `/personal-finance-calculators/`
3. **Double-click `index.html`** (opens Budget Planner in your browser)

That's it! No installation, no setup, no accounts needed.

### Step 2: Navigate Between Calculators
- Click the **Pills** in the menu bar
- Select which calculator you want to use:
  - Budget Planner
  - Commission Breakdown  
  - Student Loans Calculator

### Step 3: Enter Your Data
- Fill in your financial information
- **Your data auto-saves** as you type (stored in your browser)
- Close the tab anytime—your data will be there when you return
- Works completely **offline** after the first load

---

## 💾 Where is My Data Saved?

Your data is saved in your browser's **localStorage**:
- **Location:** Stored on your computer (inside your browser)
- **Privacy:** Never uploaded to the internet
- **Persistence:** Stays saved until you clear your browser data
- **Per-device:** Each computer/browser stores data independently
- **Backup:** Export to CSV (Student Loans) or take screenshots

**To clear your data:** Clear your browser's cache/cookies for this site.


---

## 🧮 How the Calculators Work

### Budget Planner
**The Problem:** You're paid every 2 weeks, but bills are monthly. How do you budget?

**The Solution:** The calculator uses this formula:
```
Monthly Income = (Bi-weekly Paycheck × 26 paychecks per year) ÷ 12 months
```

**Why 26?** There are 52 weeks in a year, so 52 ÷ 2 = 26 paychecks (not 24!).

**Example:**
- Bi-weekly paycheck: $2,000
- Monthly equivalent: ($2,000 × 26) ÷ 12 = **$4,333.33/month**

Then you allocate that monthly amount to your expense categories.

---

### Commission Breakdown
**The Problem:** You get a commission/bonus check. How should you split it?

**The Solution:** Set percentage allocations for each category:
- Student Loan Boost: 40%
- Fun Money: 35%
- Savings: 25%

Enter your commission amount, and it automatically calculates the dollar amount for each category. The calculator ensures your percentages add up to exactly 100%.

---

### Student Loan Calculator
**The Problem:** When will I be debt-free? How much interest will I pay?

**The Solution:** Unlike simple calculators, this uses **daily interest accrual** (just like real loans):

```
Daily Interest = Current Balance × (APR ÷ 100) ÷ 365.25 days
```

**How it works:**
1. Interest is added to your balance **every single day**
2. When a payment is due (every 14 or 30 days), it's applied to the balance
3. Bonus payments go to the highest interest rate loan first (saves you the most money)
4. The calculator runs day-by-day until your balance hits $0

**Why daily interest matters:** 
Monthly calculations can be off by hundreds of dollars. Daily calculations match how your servicer actually charges interest.

**Avalanche vs Snowball:**
- **Avalanche:** Pay off highest interest rate first → saves the most money
- **Snowball:** Pay off smallest balance first → psychological motivation
- The calculator shows **both** strategies so you can decide

---

---

## 💡 Real-World Examples

### Example 1: First Time Budgeting
**Situation:** You just graduated and got your first job. You're paid $2,500 every two weeks after taxes.

**How to use:**
1. Open **Budget Planner**
2. Enter bi-weekly pay: $2,500
3. See monthly equivalent: **$5,416.67**
4. Add your expenses:
   - Rent: $1,500
   - Groceries: $400
   - Car Payment: $350
   - Utilities: $150
   - Savings (20%): $1,083.33
   - Student Loan: $500
5. **Result:** You have $1,433.34 left over → adjust categories or increase savings

---

### Example 2: Bonus Commission Split
**Situation:** You just got a $5,000 commission check. You want to be smart about how you spend it.

**How to use:**
1. Open **Commission Breakdown**
2. Enter commission: $5,000
3. Set your percentages:
   - Student Loans: 40% → **$2,000**
   - Emergency Fund: 30% → **$1,500**
   - Fun Money: 20% → **$1,000**
   - Retirement: 10% → **$500**
4. **Result:** Clear plan for your money before you spend it

---

### Example 3: Student Loan Payoff Plan
**Situation:** You have $30,000 in student loans at 5.5% APR. You can afford $175 every two weeks.

**How to use:**
1. Open **Student Loan Calculator**
2. Enter loan balance: $30,000
3. Enter APR: 5.5%
4. Enter payment: $175 bi-weekly
5. **Result:** 
   - Paid off in: **Jul 2031** (7.4 years)
   - Total interest: **$7,892**
6. **Test bonus:** Add $500 quarterly bonus
   - **New result:** Paid off in **May 2030** (6.1 years)
   - **Total interest:** $6,420
   - **You save:** $1,472 with bonuses!

---

### Example 4: Tax Refund Strategy
**Situation:** You're getting a $2,000 tax refund. Should you put it toward loans or save it?

**How to use:**
1. Open **Student Loan Calculator**
2. Add one-time bonus: $2,000
3. See how many months earlier you'll be debt-free
4. See how much interest you save
5. Make an informed decision based on real numbers


---

## 🖥️ Technical Requirements

### What You Need
- **Any modern web browser:**
  - Google Chrome (recommended)
  - Microsoft Edge
  - Firefox
  - Safari
- **No internet connection** (after initial download)
- **No software installation**
- **No account or login**

### File Structure
```
personal-finance-calculators/
├── index.html                    # Budget Planner (start here)
├── commission-breakdown.html     # Commission Calculator
├── student-loans.html            # Student Loan Calculator
└── README.md                     # This file
```

### How Data is Stored
- **Where:** In your browser's localStorage (on your computer)
- **How much:** Up to 10MB (plenty for financial data)
- **How long:** Until you manually clear your browser data
- **Sharing:** Each browser on each device has its own separate data
- **Backup:** Export to CSV or take screenshots


## 📄 License

MIT License - Free to use, modify, and distribute.

---

---

## ❓ Frequently Asked Questions

### Is my financial data safe?
**Yes!** All calculations happen on your computer. Your data **never leaves your device**. No servers, no uploads, no accounts. 100% private.

### Will my data be there when I come back?
**Yes!** Everything auto-saves to your browser's localStorage. Close the tab, shut down your computer—when you reopen the file, your data will be exactly as you left it.

### What happens if I clear my browser data?
Your saved information will be deleted. To prevent data loss, export to CSV (Student Loans) or take screenshots of your budgets.

### Can I use this on my phone?
**Yes!** All calculators are mobile-friendly. Just open the HTML files in your phone's browser (Chrome, Safari, etc.).

### Can I use this for car loans, personal loans, or credit cards?
**Yes!** The Student Loan Calculator works for any installment loan with a fixed payment schedule. Just enter your loan details.

### Why is my result different from my loan servicer's website?
This calculator uses **daily interest accrual** (the most accurate method). Many servicer websites use simplified monthly calculations. Daily calculations are more precise and match how loans actually work.

### Do I need to be online to use this?
**No!** After the first load (which downloads Tailwind CSS and icons from CDN), everything works offline. Perfect for privacy and when you don't have internet.

### Why bi-weekly payments instead of monthly?
Many people are paid every 2 weeks (26 paychecks/year), not twice a month (24 paychecks/year). This calculator accounts for that difference. For loans, bi-weekly payments result in one extra month of payments per year, which saves you money on interest!

### Can I share this with friends/family?
**Absolutely!** Just send them the folder or GitHub link. Each person's data stays separate on their own device.

---

---

## 📄 License

**MIT License** - Free to use, modify, and share.

---

## 💬 Questions or Feedback?

- **Found a bug?** Open an issue on GitHub
- **Have a feature idea?** Submit a feature request
- **Want to contribute?** Pull requests welcome!

---

## 🎯 Summary

**Personal Finance Calculators** is a suite of three privacy-focused tools that run **100% locally on your computer**:

1. **Budget Planner** - Convert bi-weekly paychecks to monthly budgets
2. **Commission Breakdown** - Split bonuses into percentage allocations
3. **Student Loan Calculator** - Calculate payoff dates with daily interest accuracy

**No installation. No accounts. No cloud. Just open and use.**

Your financial data stays on your device, where it belongs. 🔒

---

**Built for your financial journey** 💪
