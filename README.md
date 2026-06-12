# 🚀 Nirmalya Das — Full-Stack Portfolio

A premium, feature-rich developer portfolio built with **Next.js 16**, **Express**, **Prisma**, and **Twilio** — designed to go beyond a static resume and showcase real-world engineering capabilities.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![Twilio](https://img.shields.io/badge/Twilio-SMS%20%26%20WhatsApp-F22F46?logo=twilio)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## ✨ Features

### 🔍 Smart Search
- Global search bar across all pages (Home, Help, Join LiveHouse)
- Instantly filters portfolio skills, projects, and content
- Displays a friendly fallback message for unmatched queries

### 🆘 Emergency Dispatch System
- One-click **SMS** and **WhatsApp** emergency alerts via Twilio
- Sends structured messages including emergency type, contact details, and caller info
- Platform-aware links (iOS `sms:` vs Android `sms:`) for seamless mobile UX

### 🎪 Event Planner & Inquiry System
- **Club Operations** card for managing college club activities
- **College Event Inquiry** card for external event inquiries
- Form submissions stored via Prisma ORM + PostgreSQL

### 🏠 Join LiveHouse
- Community membership page with a clean sign-up form
- Backend API integration for persisting member data

### 📬 Contact Form
- Professional contact form with name, email, and message fields
- Data persisted to database through Express API

### 🎨 Design System
- Amazon/AWS-inspired professional button system (`.btn-amazon`, `.btn-amazon-red`, `.btn-amazon-secondary`)
- Dark mode with vibrant gradients, glassmorphism, and micro-animations
- Fully responsive layout across all breakpoints
- Framer Motion powered animations and transitions

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|-------------|--------------------------------------|
| **Frontend** | Next.js 16, React 19, TypeScript    |
| **Styling**  | Tailwind CSS 4, Custom CSS          |
| **Animations** | Framer Motion, Canvas Confetti   |
| **Backend**  | Express.js 4, TypeScript            |
| **Database** | PostgreSQL + Prisma ORM             |
| **SMS/WhatsApp** | Twilio API                      |
| **Icons**    | Lucide React                        |

---

## 📁 Project Structure

```
PORTFOLIO/
├── frontend/                # Next.js application
│   ├── src/
│   │   ├── app/             # Pages (home, help, join-livehouse)
│   │   └── components/      # Reusable components (Navbar, Skills, Contact, etc.)
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Express API server
│   ├── src/
│   │   └── server.ts        # API routes + Twilio integration
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
├── package.json             # Root workspace config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** database
- **Twilio** account (for SMS/WhatsApp features)

### 1. Clone the repository

```bash
git clone https://github.com/Rookie-123-alt/MY-PORTFOLIO.git
cd MY-PORTFOLIO
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
TWILIO_ACCOUNT_SID="your_twilio_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
TWILIO_PHONE_NUMBER="+1xxxxxxxxxx"
MY_PHONE_NUMBER="+91xxxxxxxxxx"
PORT=5000
```

### 4. Set up the database

```bash
cd backend
npx prisma migrate dev
npx prisma generate
cd ..
```

### 5. Run the development server

```bash
npm run dev
```

This starts both the **Next.js frontend** (port 3000) and **Express backend** (port 5000) concurrently.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend & backend in dev mode |
| `npm run dev:frontend` | Start only the Next.js frontend |
| `npm run dev:backend` | Start only the Express backend |
| `npm run build` | Build both frontend & backend for production |
| `npm run prisma:studio` | Open Prisma Studio (database GUI) |

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to open an issue or reach out.

---

## 📄 License

This project is open source and available for reference and learning purposes.

---

<p align="center">
  Built with ❤️ by <strong>Nirmalya Das</strong>
</p>
