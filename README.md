🛒 Full-Stack E-Commerce Platform
A production-ready full-stack e-commerce web application built using React.js (frontend) and Node.js + Express.js (backend). The platform supports authentication, product browsing, cart management, and order processing with secure API architecture.

🚀 Features

🔐 User Registration & Login (JWT Authentication)
🛍️ Product Listing & Dynamic Product Pages

🛒 Add to Cart & Cart Management

📦 Order Placement System

🔒 Password Hashing using bcrypt

🌐 RESTful API Integration

📱 Responsive UI Design

🔔 Toast Notifications for UX feedback

⚡ Optimized component structure

🏗️ Tech Stack
Frontend

React.js

React Router DOM

Axios

Context API (State Management)

CSS / Tailwind CSS

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT (Authentication)

bcrypt (Password Encryption)

CORS Middleware

📂 Folder Structure
ecommerce/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── api/
│
├── server/                 # Node Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md

🔐 Authentication Flow

User registers → Password hashed using bcrypt

User logs in → JWT token generated

Token stored in client

Protected routes validated via middleware

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/Lithish779/ecommerce.git
cd ecommerce

2️⃣ Backend Setup
cd server
npm install
npm run dev


Create .env file inside server/:

PORT=XXXX
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

3️⃣ Frontend Setup
cd client
npm install
npm run dev

🌍 Deployment
Frontend

Vercel / Netlify

Backend

Render

Ensure:

Environment variables are configured

CORS is enabled properly

Production build is optimized

📈 Future Enhancements

💳 Payment Gateway Integration (Stripe / Razorpay)

🛠️ Admin Dashboard

⭐ Product Reviews & Ratings

❤️ Wishlist Feature

📦 Order Tracking

🧠 What This Project Demonstrates

Full-stack architecture implementation

REST API development

Secure authentication using JWT

State management in React

Database schema design

Deployment workflow understanding

👨‍💻 Author

Developed as part of full-stack development practice and placement preparation.
