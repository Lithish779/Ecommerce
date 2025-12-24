🛒 Full-Stack E-commerce Platform

A scalable, production-oriented full-stack e-commerce application built with modern web technologies. The platform focuses on clean UI, reliable APIs, and real-world shopping workflows including product discovery, cart management, authentication, and checkout.

This project is designed to demonstrate end-to-end engineering ownership—from frontend UX to backend architecture and database design.

🚀 Key Highlights

Modular, component-driven frontend architecture

RESTful backend with clean separation of concerns

Persistent cart and user session handling

Optimized data flow between client and server

Production-ready folder structure and conventions

🧱 Tech Stack
Frontend

React.js

Tailwind CSS

React Router

Axios

Backend

Node.js

Express.js

MongoDB (Mongoose ODM)

Tooling & DevOps

Git & GitHub

Postman (API testing)

Environment-based configuration

✨ Core Features

User authentication (login & logout)

Product listing with categories

Search and filtering

Cart management (add, update, remove)

Checkout workflow

Persistent state using local storage / database

Responsive, mobile-first UI

Ecommerce/
│
├── lk/                          # Frontend (React Application)
│   │
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── assets/              # Images, icons, static assets
│   │   │
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── Loader.jsx
│   │   │
│   │   ├── pages/               # Route-level pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── context/             # Global state management
│   │   │   ├── CartContext.jsx
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/            # API calls & external services
│   │   │   └── api.js
│   │   │
│   │   ├── utils/               # Helper functions
│   │   │   └── formatPrice.js
│   │   │
│   │   ├── App.jsx              # Root component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   │
│   ├── .env                     # Frontend environment variables
│   ├── package.json
│   └── vite.config.js / webpack.config.js
│
├── server/                      # Backend (Node.js + Express)
│   │
│   ├── config/                  # Configuration files
│   │   ├── db.js                # MongoDB connection
│   │   └── env.js
│   │
│   ├── models/                  # Database schemas (Mongoose)
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   │
│   ├── controllers/             # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   │
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── middleware/              # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   │
│   ├── utils/                   # Utility helpers
│   │   └── generateToken.js
│   │
│   ├── .env                     # Backend environment variables
│   ├── server.js                # App entry point
│   └── package.json
│
├── .gitignore
├── README.md
└── package-lock.json
