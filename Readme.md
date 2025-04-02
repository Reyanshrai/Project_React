# Full Stack React Project - Fitness Gym Website

This is a modern full-stack web application for a fitness gym, built with React.js and Node.js. The website provides a comprehensive platform for gym members to explore services, manage memberships, book classes, access diet plans, and interact with trainers.

## 🚀 Tech Stack

### Frontend
- **Framework**: React.js 18.3
- **Build Tool**: Vite 6.0
- **Styling**: Tailwind CSS 3.4 + Flowbite React 0.10
- **State Management**: React Context API
- **Routing**: React Router DOM v7.1
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **UI Components**:
  - Flowbite React components
  - Swiper 11.2 for carousels
  - Lucide React 0.473 for icons
  - React Icons 5.4

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.21
- **Database**: MongoDB with Mongoose 8.9 ODM
- **Authentication**: JWT with bcrypt
- **API Validation**: Express Validator 7.2
- **HTTP Status Codes**: http-status-codes 2.3
- **Middleware**:
  - CORS
  - Cookie Parser
  - Morgan (logging)
  - Express Async Handler

## 🌟 Website Features

### 📱 User Interface
- Modern, responsive design optimized for all devices
- Intuitive navigation with smooth transitions
- Interactive components using Flowbite React
- Dynamic carousels showcasing gym facilities and success stories

### 🔐 User Management
- Secure user registration and authentication
- JWT-based authentication with protected routes
- Personal dashboard for members
- Profile management with password updates

### 💪 Core Features
1. **Home Page**
   - Welcome section with gym highlights
   - Featured services and programs
   - Quick access to membership options

2. **Services**
   - Comprehensive list of training programs
   - Personal training options
   - Group classes information
   - Specialized workout programs

3. **Trainers**
   - Professional trainer profiles
   - Expertise and certifications
   - Trainer management (admin only)

4. **Class Timetable**
   - Weekly class schedule
   - Class descriptions and difficulty levels
   - Online booking system
   - Class availability tracking

5. **Pricing Plans**
   - Flexible membership options
   - Detailed plan comparisons
   - Subscription management

6. **Contact & Support**
   - Interactive contact form
   - Gym location with map
   - Business hours information

7. **User Dashboard**
   - Personal weight tracking
   - Class booking functionality
   - Subscription management
   - Diet plan selection and viewing

8. **Admin Dashboard**
   - Member management
   - Trainer management
   - Admin authentication and authorization
   - Data visualization and statistics

9. **Diet Plans**
   - Various diet plan options
   - Meal suggestions and nutritional information
   - Diet plan subscriptions

## 📁 Project Structure

### Frontend Structure
```
Frontend/
├── public/                # Static files
├── src/                   # Source code
│   ├── assets/            # Images, fonts, and other static assets
│   │   ├── dashboard/     # Dashboard-specific components
│   ├── config/            # Configuration files (axios setup)
│   │   └── axios.js       # Axios setup
│   ├── context/           # React Context providers (UserContext)
│   ├── pages/             # Page components
│   │   ├── Admin/         # Admin dashboard pages
│   │   ├── Home.jsx       # Homepage component
│   │   ├── LoginPage.jsx  # User login page
│   │   ├── RegisterPage.jsx # User registration page
│   │   ├── UserDashboard.jsx # User dashboard page
│   │   ├── Services.jsx   # Services page
│   │   ├── Contact.jsx    # Contact page
│   │   ├── Pricing.jsx    # Pricing/subscription plans page
│   │   ├── Timetable.jsx  # Class timetable page
│   │   ├── Trainer.jsx    # Trainers page
│   │   └── NotFound.jsx   # 404 page
│   ├── routes/            # Route configurations
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── package.json           # Dependencies and scripts
```

### Backend Structure
```
Backend/
├── controllers/           # Route controllers
│   ├── adminController.js # Admin management
│   ├── userController.js  # User authentication & profile
│   ├── memberController.js # Gym member management
│   ├── trainerController.js # Trainer management
│   ├── classController.js  # Class bookings
│   ├── dietPlanController.js # Diet plans
│   └── subscriptionController.js # Subscription plans
├── models/                # Database models
│   ├── adminModel.js      # Admin schema
│   ├── userModel.js       # User schema
│   ├── memberModel.js     # Member schema
│   └── trainerModel.js    # Trainer schema
├── routes/                # API routes
│   ├── adminRoutes.js     # Admin endpoints
│   ├── userRoutes.js      # User endpoints
│   ├── memberRoutes.js    # Member endpoints
│   ├── trainerRoutes.js   # Trainer endpoints
│   ├── classRoutes.js     # Class endpoints
│   ├── dietPlanRoutes.js  # Diet plan endpoints
│   └── subscriptionRoutes.js # Subscription endpoints
├── middleware/            # Custom middleware
│   └── authMiddleware.js  # Authentication middleware
├── validators/            # Request validators
│   └── userValidation.js  # User input validation
├── database/              # Database configuration
│   └── mongoDb.js         # MongoDB connection setup
├── .env                   # Environment variables
├── app.js                 # Express app setup
└── server.js              # Server entry point
```

## 🛠️ Setup and Installation

1. Clone the repository
2. Set up the Backend:
   ```bash
   cd Backend
   npm install
   ```
3. Create a `.env` file in the Backend directory with:
   ```
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   NODE_ENV=development
   ```
4. Set up the Frontend:
   ```bash
   cd Frontend
   npm install
   ```
5. Create a `.env` file in the Frontend directory with:
   ```
   VITE_API_URL=http://localhost:3000
   ```

## 🚀 Running the Application

### Backend
```bash
cd Backend
npx nodemon server.js
```

### Frontend
```bash
cd Frontend
npm run dev
```

## 🔑 API Endpoints

### User Routes
- `POST /users/register` - Register a new user
- `POST /users/login` - Login user
- `GET /users/logout` - Logout user
- `GET /users/profile` - Get current user profile
- `GET /users/profile/:id` - Get user profile by ID
- `PUT /users/password` - Update user password
- `PATCH /users/:id/weight` - Update user weight

### Admin Routes
- `POST /admins/register` - Register admin
- `POST /admins/login` - Login admin
- `GET /admins/logout` - Logout admin

### Subscription Routes
- `GET /api/subscriptions/plans` - Get all subscription plans
- `POST /api/subscriptions` - Subscribe to a plan

### Diet Plan Routes
- `GET /api/diet-plans` - Get all diet plans
- `POST /api/diet-plans/subscribe` - Subscribe to a diet plan

### Class Routes
- `GET /api/classes/upcoming` - Get upcoming classes
- `POST /api/classes/book` - Book a class

### Member Routes
- `GET /members` - Get all gym members
- `POST /members` - Add a new member
- `GET /members/:id` - Get a specific member
- `PUT /members/:id` - Update a member
- `DELETE /members/:id` - Delete a member

### Trainer Routes
- `GET /trainers` - Get all trainers
- `POST /trainers` - Add a new trainer
- `GET /trainers/:id` - Get a specific trainer
- `PUT /trainers/:id` - Update a trainer
- `DELETE /trainers/:id` - Delete a trainer

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Request validation using Express Validator
- Protected API routes with middleware
- HTTP-only cookies for tokens
- CORS protection

## 💻 Development Tools
- ESLint for code linting
- Nodemon for backend development
- Vite for frontend development
- PostCSS for CSS processing

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License
This project is licensed under the ISC License.
