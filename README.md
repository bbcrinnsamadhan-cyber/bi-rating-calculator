# 📊 BI Rating Calculator — ऋण Samadhan

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![React](https://img.shields.io/badge/frontend-React-61dafb.svg)
![Node](https://img.shields.io/badge/backend-Node.js-339933.svg)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47a248.svg)

A premium, data-driven Business Intelligence (BI) Rating platform designed for **ऋण Samadhan**. This application helps assess loan eligibility through a comprehensive 5-step analysis of a user's profile, financial behavior, and credit strength.

---

## ✨ Features

- **Intuitive Multi-Step Flow**: Seamlessly navigate through Profile, Employment, Credit, and Financial assessments.
- **Dynamic Calculation**: Real-time logic for Net Worth to Borrowing ratios and overall risk indexing.
- **Premium UI/UX**: Built with a focus on modern aesthetics—vibrant colors, glassmorphism, and smooth animations.
- **Secure Submissions**: Mandatory declarations and disclaimers to ensure data integrity and legal compliance.
- **RESTful Backend**: Structured Express API with MongoDB integration for persistent lead storage.
- **Automated Validation**: Frontend validation powered by Zod for a bug-free user experience.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS (Custom Premium Tokens)
- **Form Management**: React Hook Form
- **Validation**: Zod
- **State Management**: Zustand / Custom Hooks

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: CORS, express-rate-limit, express-mongo-sanitize, xss-clean
- **Communication**: Resend API integration for automated connectivity.

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas or Local Instance
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/bbcrinnsamadhan-cyber/bi-rating-calculator.git
cd bi-rating-calculator
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
RESEND_API_KEY=your_resend_api_key
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

```text
├── backend
│   ├── src
│   │   ├── config      # Database connection
│   │   ├── controllers # Logic for leads
│   │   ├── middlewares # Rate limiting, security
│   │   ├── models      # Mongoose schemas
│   │   └── routes      # API endpoints
│   └── server.js       # Entry point
├── frontend
│   ├── src
│   │   ├── components  # UI Components & Steps
│   │   ├── services    # API handlers (Axios)
│   │   ├── store       # Global state
│   │   └── validation  # Zod schemas
│   └── index.html
└── README.md
```

---

## ⚖️ Disclaimer & Consent
The BI Rating provided by this tool is indicative. Final loan eligibility depends on specific lender policies and undergo detailed verification by human experts at **ऋण Samadhan**.

---

## 👤 Author
Developed for **ऋण Samadhan**.  
*Maintained by: amit2003-cse*

---

© 2026 ऋण Samadhan. All rights reserved.
