# 🏋️‍♂️ Fitness Gym Website

## Overview
Welcome to the Fitness Gym Website project! This modern, responsive web application is designed to provide a comprehensive platform for gym members to access services, schedules, and manage their fitness journey. The project is built with a full-stack architecture, utilizing Node.js and Express for the backend, and React with Vite for the frontend.

## 🚀 Features

### 📱 User Interface
- Modern and responsive design
- Smooth animations and transitions
- Mobile-first approach
- Intuitive navigation with a clean layout

### 🔐 Authentication
- User registration system
- Secure login functionality
- Password recovery option
- Protected routes for authenticated users

### 📄 Main Pages
1. **Home** (`/`)
   - Welcome section
   - Featured services
   - Quick access to important sections

2. **About** (`/about`)
   - Gym history and mission
   - Team introduction
   - Facility information

3. **Services** (`/services`)
   - Comprehensive list of gym services
   - Service details and benefits
   - Membership options

4. **Timetable** (`/timetable`)
   - Class schedules
   - Training sessions
   - Availability tracking

5. **Trainers** (`/trainer`)
   - Professional trainer profiles
   - Expertise and specializations
   - Booking options

6. **Pricing** (`/pricing`)
   - Membership plans
   - Package comparisons
   - Special offers

7. **Contact** (`/contact`)
   - Contact form
   - Location information
   - Business hours

### 👤 User Features
- **Login** (`/login`)
- **Registration** (`/register`)
- **Password Recovery** (`/forgot-password`)
- **Dashboard** (for registered users)

## 🛠️ Technical Stack

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React.js, Vite, Tailwind CSS
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **Form Handling:** React Hook Form
- **Routing:** React Router v6
- **Code Quality:** ESLint

## 📂 Project Structure

### Backend Structure
```
Backend/
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── app.js               # Main application entry point
├── controllers/         # Route controllers
│   └── userController.js# User-related controllers
├── database/            # Database connection
│   └── db.js            # MongoDB connection setup
├── middleware/          # Custom middleware functions
│   └── authMiddleware.js# Authentication middleware
├── models/              # Database models
│   └── userModel.js     # User model
├── routes/              # API routes
│   └── userRoutes.js    # User-related routes
├── validators/          # Request validators
│   └── userValidation.js# User validation rules
├── package.json         # Project configuration and dependencies
└── package-lock.json    # Locked versions of dependencies
```

### Frontend Structure
```
Frontend/
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── README.md            # Frontend specific documentation
├── eslint.config.js     # ESLint configuration
├── index.html           # Entry HTML file
├── node_modules/        # Node.js dependencies
├── package.json         # Project configuration and dependencies
├── package-lock.json    # Locked versions of dependencies
├── postcss.config.js    # PostCSS configuration
├── public/              # Static assets
├── src/                 # Source code directory
│   ├── App.css          # Main application styles
│   ├── App.jsx          # Main application component
│   ├── assets/          # Static assets for the application
│   ├── components/      # Reusable components
│   │   ├── Footer.jsx   # Footer component
│   │   ├── Navbar.jsx   # Navigation bar component
│   │   └── index.js     # Components barrel file
│   ├── context/         # Context API for state management
│   │   └── userContext.jsx # User context
│   ├── pages/           # Application pages
│   │   ├── about.jsx    # About page
│   │   ├── contact.jsx  # Contact page
│   │   ├── dashboard.jsx# Dashboard page
│   │   ├── forgotPassword.jsx # Forgot Password page
│   │   ├── home.jsx     # Home page
│   │   ├── loginPage.jsx# Login page
│   │   ├── NotFound.jsx # 404 Not Found page
│   │   ├── pricing.jsx  # Pricing page
│   │   ├── registerPage.jsx # Registration page
│   │   ├── services.jsx # Services page
│   │   ├── timetable.jsx# Timetable page
│   │   ├── trainer.jsx  # Trainer page
│   │   └── index.js     # Pages barrel file
│   ├── routes/          # Application routes
│   │   └── AppRoutes.jsx# Route definitions
│   ├── utils/           # Utility functions
│   │   └── ProtectedRoute.jsx # Protected route component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles including Tailwind imports
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite bundler configuration
```

## 🔧 Development Setup

### Backend Setup:
1. Navigate to the Backend directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with the necessary environment variables
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup:
1. Navigate to the Frontend directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---
Built with ❤️ by React Team - [Reyanshrai](https://github.com/Reyanshrai/Project_React) • [Vivek Kumar](https://github.com/vsah7079) • [Himanshu Kumar](https://github.com/himanshu-kumar-911)
