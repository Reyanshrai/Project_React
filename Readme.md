# Full Stack React Project - Fitness Gym Website

This is a modern full-stack web application for a fitness gym, built with React.js and Node.js. The website provides a comprehensive platform for gym members to explore services, manage memberships, and interact with trainers.

## 🚀 Tech Stack

### Frontend
- **Framework**: React.js 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Flowbite React
- **State Management**: React Context/Props
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **UI Components**:
  - Flowbite React components
  - Swiper for carousels
  - Lucide React icons
  - React Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt
- **API Validation**: Express Validator
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
- Personal dashboard for members
- Password recovery system
- Profile management

### 💪 Core Features
1. **Home Page**
   - Welcome section with gym highlights
   - Featured services and programs
   - Success stories carousel
   - Quick access to membership options

2. **Services**
   - Comprehensive list of training programs
   - Personal training options
   - Group classes information
   - Specialized workout programs

3. **Trainers**
   - Professional trainer profiles
   - Expertise and certifications
   - Booking system for personal sessions
   - Trainer availability calendar

4. **Class Timetable**
   - Weekly class schedule
   - Real-time class availability
   - Class descriptions and difficulty levels
   - Online booking system

5. **Pricing Plans**
   - Flexible membership options
   - Detailed plan comparisons
   - Special offers and promotions
   - Secure payment integration

6. **Contact & Support**
   - Interactive contact form
   - Gym location with map
   - Business hours
   - Emergency contact information

7. **Member Dashboard**
   - Personal workout tracking
   - Class booking history
   - Membership status and renewal
   - Progress monitoring

## 📁 Project Structure

### Frontend Structure
```
Frontend/
├── public/           # Static files
├── src/             # Source code
├── .env             # Environment variables
├── index.html       # Entry HTML file
├── vite.config.js   # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json     # Dependencies and scripts
```

### Backend Structure
```
Backend/
├── controllers/     # Route controllers
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── validators/     # Request validators
├── database/       # Database configuration
├── .env           # Environment variables
├── app.js         # Express app setup
└── server.js      # Server entry point
```

## 🛠️ Setup and Installation

1. Clone the repository
2. Set up the Backend:
   ```bash
   cd Backend
   npm install
   ```
3. Set up the Frontend:
   ```bash
   cd Frontend
   npm install
   ```

## 🚀 Running the Application

### Backend
```bash
cd Backend
npm start
```

### Frontend
```bash
cd Frontend
npm run dev
```

## 🔑 Environment Variables

### Backend (.env)
Required environment variables:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `PORT`: Server port (default: 5000)

### Frontend (.env)
Required environment variables:
- `VITE_API_URL`: Backend API URL

## 📦 Dependencies

### Frontend Dependencies
- React and React DOM
- React Router for navigation
- Axios for API requests
- Flowbite and Tailwind for UI
- Various UI utilities and components

### Backend Dependencies
- Express.js for server framework
- Mongoose for MongoDB interactions
- JWT and bcrypt for authentication
- Express validators for request validation
- Various middleware utilities

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Request validation
- Protected API routes
- HTTP-only cookies
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
