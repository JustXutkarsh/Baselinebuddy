Baselinebuddy
# 🧠 Baseline Buddy – AI-Powered Web Compatibility Assistant

### 🚀 Hackathon Project Submission

Baseline Buddy is an **AI-driven developer assistant** that integrates **Baseline data** about web features into your coding environment — helping you **build modern, compatible, and future-proof web apps**.

> “Ship modern web features — without breaking the old web.”

---

## 🌐 Overview

Web developers often use **modern web APIs** or **CSS features** that aren’t fully supported across browsers.  
Baseline Buddy solves this by embedding **real-time Baseline compatibility checks** directly into your workflow.

It’s built as:
- A **VS Code extension** for inline code insights.
- A **web dashboard** for visualizing browser support and compatibility reports.

---

## 🧩 Key Features

### 🟢 **1. Real-Time Code Checker**
Scans your HTML, CSS, and JS code to detect unsupported or experimental features using Baseline data.

### 🤖 **2. AI Fix Suggestions**
Suggests safer alternatives, polyfills, or progressive enhancement strategies.  
Example: Recommends using JavaScript element checks instead of CSS `:has()` when unsupported.

### 🌍 **3. Browser Visualizer**
Displays adoption and support timelines for features across Chrome, Firefox, Edge, and Safari.

### ⚙️ **4. Linter Integration**
Integrates with ESLint to automatically warn about compatibility issues during development.

### 📈 **5. Compatibility Score**
Assigns a modernization score to your codebase and tracks improvement over time.

---

## 🧠 Advanced Add-ons (Winning Features)

- **Explain Why:** AI + MDN integration explains *why* a feature is risky.  
- **Auto-Fix Mode:** Automatically replaces unsupported syntax with safer alternatives.  
- **Docs Integration:** Hover cards linking to MDN, CanIUse, and polyfills.io.  
- **CLI Tool:** Run quick audits — `npx baseline-buddy scan ./src`.  
- **Gamified Dashboard:** Badges and scores for developers who write Baseline-safe code.  
- **Agentic UI:** Real-time animated "agents" visualize compatibility scanning and code repair — making the UX feel alive and interactive.

---

## 🧰 Tech Stack

| Component | Technology |
|------------|-------------|
| **Frontend (Dashboard)** | React + TypeScript |
| **Extension** | VS Code API + Node.js |
| **Backend** | Supabase (storage & auth) |
| **AI Layer** | Gemini / OpenAI APIs for fix suggestions |
| **Data Source** | Baseline Web Features API + MDN Web Docs |
| **Styling** | TailwindCSS + Framer Motion for agentic animations |

---

## 🧪 Example Output

**Code:**
```css
:has(img) {
  border: 2px solid red;
}
