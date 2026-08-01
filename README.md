# 🎓 IIUC EventEra - University Event Management System

IIUC EventEra is a modern, full-stack event management web application designed for university campuses. It allows students to discover upcoming campus events, register for seminars/workshops/tournaments, make mobile banking payments (bKash & Nagad), download official PDF event passes with embedded QR codes, and explore campus clubs. It also features a comprehensive Admin Control Center for event creation, registration management, payment approval, and live QR code ticket scanning.

---

## 🚀 Key Features

### 👨‍🎓 For Students
- **Event Discovery & Filtering**: Search and filter events by category (Seminar, Workshop, Sports, Cultural, Tech Fest) and date.
- **Multi-Step Registration**: Smooth registration flow supporting both **Free** and **Paid** events.
- **Mobile Banking Payment**: Direct integration for submitting transaction IDs for **bKash** and **Nagad** payments.
- **PDF Pass & QR Code**: Automatically generate and download high-resolution event tickets in PDF format containing unique verification QR codes.
- **Firebase Authentication**: Secure login and sign-up with Email/Password, Google, and GitHub OAuth, complete with profile completion prompts.
- **University Clubs Directory**: Browse active student clubs, view club executive committees, upcoming club events, and join clubs.
- **AI Campus Assistant**: Integrated interactive chatbot providing real-time guidance and event information.
- **Dark & Light Mode**: Persistent theme switching powered by CSS custom design tokens.

### 🛡️ For Administrators
- **Admin Control Center**: Overview dashboard with key metrics (Total Events, Active Registrations, Users, Pending Payments).
- **Event Management**: Create, edit, update seating capacity, and delete campus events.
- **Registration & Payment Verification**: View student registrations, verify payment transaction IDs, and approve or reject tickets.
- **Gateways Settings**: Manage official university bKash and Nagad numbers dynamically.
- **Live QR Ticket Scanner**: Integrated camera barcode scanner (`html5-qrcode`) to scan student PDF ticket passes at event entrances for instant validation.
- **Contact Messages Center**: Read and manage student inquiries and feedback.

---

## 👥 Behind The Web (Organizing Committee)

| Team Member | Role(s) | Key Contributions |
| :--- | :--- | :--- |
| **MD AL Araf Hossain** | Frontend · Backend · Database | Full-stack development, UI design, REST APIs, and database architecture |
| **Foyez Ahammed Nirob** | Frontend | Responsive UI components, user experience polish, and layout design |
| **Sanayat Fahim** | Authentication | Firebase authentication flows, user authorization, and access management |
| **Tahsin Kamal** | Backend | Server-side logic, API endpoints, and event registration processing |

---

## 🛠️ Tech Stack & Technologies Used

### **Frontend (`/client`)**
| Technology | Description |
| :--- | :--- |
| **React 19** | Component-based UI library |
| **Vite 8** | Next-generation fast frontend tooling & bundler |
| **React Router v8** | Declarative client-side routing |
| **TailwindCSS v4 & daisyUI v5** | Utility-first CSS framework & modern UI components |
| **Vanilla CSS Design Tokens** | Custom HSL color palette, Glassmorphism, animations, Space Grotesk & Inter typography |
| **Firebase Auth v12** | User authentication (Google, GitHub, Email/Password) |
| **jsPDF & html2canvas** | Client-side PDF generation for event passes |
| **qrcode.react & html5-qrcode** | QR code generation & camera QR code scanning |

### **Backend (`/server`)**
| Technology | Description |
| :--- | :--- |
| **Node.js** | Server-side JavaScript runtime environment |
| **Express.js v4** | Lightweight RESTful Web API framework |
| **MongoDB Native Driver v6** | Document database for storing users, events, registrations, payments, and settings |
| **Cors & Dotenv** | Cross-Origin Resource Sharing and environment variable management |
| **Nodemon** | Automatic dev server restart on code changes |

---

## 📁 Project Structure

```
IIUC-EventEra/
├── client/                            # Frontend React Application
│   ├── public/                        # Static public assets & icons
│   ├── src/
│   │   ├── assets/                    # Project images & webp assets
│   │   ├── Components/
│   │   │   ├── About/                 # About page & mission statement
│   │   │   ├── Admin/                 # Admin Dashboard, Manage Events, Registrations, QR Scanner, Settings
│   │   │   ├── Chatbot/               # Floating AI Assistant component & styles
│   │   │   ├── Clubs/                 # Campus Clubs directory & detail views
│   │   │   ├── Contact/               # Contact form & interactive campus map
│   │   │   ├── Dashboard/             # Student Dashboard & PDF Ticket generator
│   │   │   ├── EventDetails/          # Event detail view & seat status
│   │   │   ├── EventRegistration/    # Multi-step registration modal/page
│   │   │   ├── Events/                # Events gallery, category filters & search
│   │   │   ├── Firebase/              # Firebase SDK initialization
│   │   │   ├── Footer/                # Global footer with university links
│   │   │   ├── Home/                  # Hero banner, Event Carousel, Countdown Timer & Stats
│   │   │   ├── Login/                 # Authentication modal & social sign-in
│   │   │   ├── Navigation/            # Glassmorphism Navbar with theme switcher & user menu
│   │   │   ├── Payment/               # Manual bKash/Nagad payment submission
│   │   │   ├── PrivateRoute/          # Protected & Admin-only route guards
│   │   │   ├── Registration/          # User registration view
│   │   │   └── Root/                  # Main layout container
│   │   ├── Providers/                 # React AuthContext for user state
│   │   ├── App.jsx                    # Application routing & route tree
│   │   ├── App.css                    # Component layout utilities
│   │   ├── config.js                  # Dynamic API endpoint configuration
│   │   ├── index.css                  # Core CSS design tokens, dark mode & animations
│   │   └── main.jsx                   # React application entrypoint
│   ├── index.html                     # HTML root template
│   ├── vite.config.js                 # Vite bundler configuration
│   └── package.json                   # Client dependencies & build scripts
│
├── server/                            # Backend Node.js Express Application
│   ├── .env                           # Server environment variables
│   ├── index.js                       # Express REST API routes & MongoDB connection
│   └── package.json                   # Server dependencies & start scripts
│
└── README.md                          # Project documentation
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **GET / POST** | `/events` | Get all events / Create new event | Public / Admin |
| **GET / PUT / DELETE** | `/events/:id` | Get single event / Update event / Delete event | Public / Admin |
| **GET / POST** | `/users` | Get users list / Sync Firebase user profile | Admin / Public |
| **GET** | `/users/admin/:email` | Check if user has Admin role | Authenticated |
| **POST** | `/registrations` | Register for an event (Auto-books seat) | Authenticated |
| **GET** | `/registrations/user/:email` | Get user's registered events | Authenticated |
| **POST** | `/registrations/verify` | Verify QR code ticket pass | Admin |
| **POST / GET** | `/payments` | Submit payment transaction / Get all payments | Authenticated / Admin |
| **GET / PUT** | `/settings` | Get / Update bKash and Nagad numbers | Public / Admin |
| **POST / GET / DELETE** | `/contacts` | Submit contact message / View / Delete messages | Public / Admin |
| **GET** | `/stats` | Get overview analytics statistics | Admin |

---

## ⚡ Getting Started

### 📋 Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **MongoDB** (Local instance or MongoDB Atlas cluster URI)

---

### 📥 Installation & Local Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/Araf1011/IIUC-EventEra.git
cd IIUC-EventEra
```

#### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install server dependencies
npm install

# Create environment configuration (.env)
```

Create a `.env` file in the `server` directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=unievent
```

Start the backend server in development mode:
```bash
npm run dev
```
*The server will start on `http://localhost:3000` and seed default database events automatically.*

---

#### 3. Frontend Setup
```bash
# Open a new terminal tab and navigate to client directory
cd client

# Install client dependencies
npm install

# Start Vite development server
npm run dev
```
*The client app will launch at `http://localhost:5173`.*

---

## 🛠️ Build for Production

To build the client application for production:
```bash
cd client
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---
Live link : https://iiuc-event-era-ky69.vercel.app/
