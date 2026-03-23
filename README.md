
# 🍎 CalorAI — AI-Powered Calorie Tracker

<div align="center">

![CalorAI](https://img.shields.io/badge/CalorAI-Nutrition%20Tracker-green?style=for-the-badge&logo=apple)
![React Native](https://img.shields.io/badge/React%20Native-Expo-blue?style=for-the-badge&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Database-darkgreen?style=for-the-badge&logo=supabase)
![n8n](https://img.shields.io/badge/n8n-Automation-orange?style=for-the-badge)
![Statsig](https://img.shields.io/badge/Statsig-A%2FB%20Testing-purple?style=for-the-badge)

**A full-stack health tracking system combining a Telegram chatbot, React Native mobile app, real-time sync, A/B testing, and analytics dashboard.**

</div>

---

## 📱 App Screenshots

| Home Screen | Analytics Dashboard | Telegram Bot |
|---|---|---|
| _(add screenshot)_ | _(add screenshot)_ | _(add screenshot)_ |

---

## 🏗️ Architecture Overview

```

┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Telegram Bot   │────▶│     n8n      │────▶│    Supabase     │
│  (User input)   │     │ (Automation) │     │   (Database)    │
└─────────────────┘     └──────┬───────┘     └────────┬────────┘
│                       │
┌──────▼───────┐               │ Real-time
│   Statsig    │               │
│ (A/B Testing)│      ┌────────▼────────┐
└──────────────┘      │  Expo Go App    │
│ (React Native)  │
└─────────────────┘

```

---

## ✨ Features

### 🤖 Telegram Chatbot (n8n)
- `/start` — A/B test onboarding: Control (simple welcome) vs Test (guided 3-step flow)
- `/log_meal <name> <calories>` — Log a meal instantly
- `/today` — View today's meals and total calories
- `/edit <id> <name> <calories>` — Edit a logged meal
- `/delete <id>` — Delete a meal
- `/help` — Show all available commands

### 📱 React Native Mobile App (Expo Go)
- View all logged meals with timestamps
- Add, edit, and delete meals directly from the app
- Real-time sync — meals logged via Telegram appear instantly (no refresh needed)
- Daily calorie progress bar with goal tracking
- Full analytics dashboard with key stats

### 📊 Analytics Dashboard
- Today's calorie progress vs 2000 cal daily goal
- Total calories, average per meal, total meals logged, day streak
- Highest and lowest calorie meal insights
- Built-in nutrition tips

### 🧪 A/B Testing (Statsig)
- Auto user assignment to Control or Test group via user ID hash
- Event logging to Statsig for every group assignment
- Experiment: `boarding_ab_test` — running from 23 March 2026
- Primary metric: Day-7 return rate (`l7`)
- Secondary metrics: WAU, weekly stickiness

### 🔔 Push Notifications
- Daily reminder at 8:00 PM to log meals
- Daily summary at 9:00 PM with total meals logged
- Real-time Supabase updates — no manual pull-to-refresh needed

---

## 🛠️ Tech Stack

| Tool | Purpose | Why |
|---|---|---|
| **n8n** | Workflow automation | Visual node-based automation, perfect for chatbot logic without writing a backend server |
| **Supabase** | Database + Real-time | PostgreSQL with built-in real-time subscriptions and a simple REST API |
| **Statsig** | A/B testing | Industry-standard experimentation platform with event logging and metric tracking |
| **Expo Go** | React Native app | Fast mobile development — scan QR and run instantly on any device |
| **Telegram Bot API** | Chat interface | Zero friction for users, widely used, no app install required |
| **expo-notifications** | Push notifications | Native Android/iOS notification support with scheduling |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- n8n account (cloud or self-hosted)
- Supabase account
- Statsig account
- Telegram Bot Token (from @BotFather)
- Expo Go app installed on your phone

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/[YOUR_GITHUB_USERNAME]/CalorAI-Mobile.git
cd CalorAI-Mobile
```


### 2️⃣ Install Dependencies

```bash
npm install
npx expo install expo-notifications
```


### 3️⃣ Environment Variables

Create a `.env` file in the root:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```


### 4️⃣ Supabase Database Setup

Run this in your Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  username TEXT,
  first_name TEXT,
  ab_group TEXT DEFAULT 'control',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Meals table
CREATE TABLE meals (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  meal_name TEXT NOT NULL,
  calories INTEGER NOT NULL,
  meal_time TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE meals;
```


### 5️⃣ Run the App

```bash
npx expo start --clear
```

Scan the QR code with **Expo Go** on your phone.

### 6️⃣ n8n Workflow Setup

1. Import `workflow.json` into your n8n instance
2. Add your Telegram Bot Token credential
3. Update Supabase URL and API key in all HTTP Request nodes
4. Update Statsig API key in HTTP Request1 node
5. Activate the workflow ✅

---

## 🗂️ Project Structure

```
CalorAI-Mobile/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx        # Tab navigation (Home + Tips)
│   │   ├── index.tsx          # Home screen — meal list + add/edit/delete
│   │   └── explore.tsx        # Analytics dashboard
│   ├── _layout.tsx            # Root layout + push notification setup
│   └── modal.tsx              # Add/Edit meal modal
├── lib/
│   └── supabase.ts            # Supabase client configuration
├── workflow.json              # n8n workflow export
├── .env                       # Environment variables (not committed)
└── README.md
```


---

## 🧪 A/B Test Evaluation Plan

### Hypothesis

> We believe that a guided 3-step onboarding flow for new Telegram bot users will improve long-term retention because structured onboarding helps users understand the app's value faster.

### Metrics

| Type | Metric | Description |
| :-- | :-- | :-- |
| Primary | `l7 (user)` | Day-7 return rate — leading retention indicator |
| Primary | `new_dau (user)` | New daily active users entering the experiment |
| Secondary | `wau (user)` | Weekly active users |
| Secondary | `weekly_stickiness` | Onboarding completion proxy |
| Guardrail | Bot block rate | Ensure no negative UX impact from onboarding |

### Decision Framework

- Run for minimum **14 days** to reach statistical significance
- Require **95% confidence level**
- Ship Test group if `l7` improves by **≥5%** with no guardrail violations
- Roll back immediately if bot block rate increases by **>2%**

---

## 🔮 What I Would Improve With More Time

- [ ] Food barcode / photo scanning using AI vision API
- [ ] Per-user calorie goal customization
- [ ] Weekly progress charts (Recharts / Victory Native)
- [ ] Full multi-user authentication with Supabase Auth
- [ ] More granular Statsig metrics (session length, feature adoption)
- [ ] Dark mode support across the app

---

## ⏱️ Time Breakdown

| Section | Time Spent |
| :-- | :-- |
| Primary Task: A/B Test (n8n + Statsig) | [YOUR TIME] hrs |
| Secondary Task: Health Chatbot | [YOUR TIME] hrs |
| Bonus 1: Expo Go Mobile App | [YOUR TIME] hrs |
| Bonus 2: Real-time + Push Notifications | [YOUR TIME] hrs |
| Bonus 3: Analytics Dashboard | [YOUR TIME] hrs |
| README + Video | [YOUR TIME] hrs |
| **Total** | **[TOTAL] hrs** |


---

## 💡 Assumptions \& Trade-offs

- **Single user mode:** App uses a hardcoded `MY_USER_ID` for simplicity instead of a full auth flow — acceptable for demo scope and avoids login complexity
- **Hash-based A/B fallback:** Used simple user ID hash for deterministic group assignment alongside Statsig event logging
- **Expo Go over bare workflow:** Chose Expo Go for faster iteration and easier demo — trade-off is no custom native modules
- **n8n cloud:** Used n8n cloud for reliability during demo — self-hosted would be used in production for cost efficiency

---

## 👤 Author

**[YOUR FULL NAME]**

- GitHub: [@[YOUR_GITHUB_USERNAME]](https://github.com/%5BYOUR_GITHUB_USERNAME%5D)
- Email: [YOUR_EMAIL]

---

<div align="center">
Built with ❤️ for CalorAI Technical Assessment — March 2026
</div>
```

***

## ✅ Only 4 things to fill in manually:

1. `[YOUR_GITHUB_USERNAME]` → your GitHub username
2. `[YOUR FULL NAME]` → your name
3. `[YOUR_EMAIL]` → your email
4. `[YOUR TIME]` → rough hours per section (e.g., 2 hrs, 1 hr etc.)

Save → push → done! 🚀
<span style="display:none">[^1]</span>

<div align="center">⁂</div>

[^1]: 1000047431.jpeg```

