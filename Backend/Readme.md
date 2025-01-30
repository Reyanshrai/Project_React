# Fitness Gym Website Backend

This is the backend server for the Fitness Gym Website, built with Node.js, Express, and MongoDB. It provides a robust API for managing user authentication, gym services, and member data.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server with nodemon
npm run dev

# Start production server
npm start
```

## 📁 Project Structure

```
Backend/
├── controllers/        # Request handlers
│   └── userController.js  # User-related operations
├── models/            # Database schemas
│   └── userModel.js      # User data model
├── routes/            # API routes
│   └── userRoutes.js     # User endpoint definitions
├── middleware/        # Custom middleware
│   └── authMiddleware.js # Authentication middleware
├── validators/        # Request validators
│   └── userValidation.js # User input validation
├── database/          # Database configuration
│   └── db.js            # MongoDB connection setup
├── .env              # Environment variables
├── app.js            # Express app setup
└── server.js         # Server entry point
```

## 🛠️ API Endpoints

### Authentication Routes
```
POST   /api/users/register     # Register new user
POST   /api/users/login        # User login
POST   /api/users/logout       # User logout
GET    /api/users/profile      # Get user profile
PUT    /api/users/profile      # Update user profile
POST   /api/users/forgot-password  # Password recovery
```

### Protected Routes
- All routes except login and register require JWT authentication
- Token must be included in request header
- Protected routes validate user session

## 💾 Database Schema

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  role: String,
  membershipType: String,
  joinDate: Date,
  // ... other user-related fields
}
```

## 🔒 Security Features

1. **Authentication**
   - JWT (JSON Web Tokens) for session management
   - Secure password hashing with bcrypt
   - HTTP-only cookies for token storage

2. **Data Validation**
   - Input sanitization
   - Request validation using express-validator
   - MongoDB injection prevention

3. **Security Headers**
   - CORS configuration
   - XSS protection
   - Rate limiting
   - Helmet security headers

## 🛠️ Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcrypt**: Password hashing
- **cookie-parser**: Cookie handling
- **cors**: CORS middleware
- **dotenv**: Environment variables
- **express-validator**: Input validation
- **morgan**: HTTP request logger

## 💻 Development

### Prerequisites
- Node.js >= 14.x
- MongoDB >= 4.x
- npm >= 6.x

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness_gym
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Available Scripts
- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `npm test`: Run tests (when implemented)

## 🔧 Middleware Stack

1. **CORS**
   - Origin validation
   - Methods allowed
   - Headers configuration

2. **Authentication**
   - Token verification
   - User session validation
   - Role-based access control

3. **Error Handling**
   - Global error handler
   - Async error wrapper
   - Validation error formatter

4. **Logging**
   - Morgan HTTP logger
   - Error logging
   - Request/Response logging

## 📊 Error Handling

- Custom error classes
- Standardized error responses
- Detailed error messages in development
- Sanitized error messages in production

## 🔍 Request Validation

- Input sanitization
- Data type validation
- Required fields checking
- Custom validation rules

## 📦 Dependencies Management

- Regular security updates
- Version control
- Vulnerability checking
- Dependency auditing

## 🚀 Deployment

1. Set up environment variables
2. Configure MongoDB connection
3. Set up proper security measures
4. Deploy to hosting platform
5. Monitor logs and performance

## 🔧 Configuration

### Database
- Connection pooling
- Indexing strategy
- Mongoose configurations
- Error handling

### Security
- Rate limiting rules
- CORS settings
- Cookie settings
- JWT configuration

## 📝 Code Style

- ESLint configuration
- Async/await patterns
- Error handling patterns
- Documentation standards

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📚 API Documentation

For detailed API documentation, refer to the following endpoints:

### User Management
- POST `/api/users/register`
  - Register new user
  - Required fields: name, email, password
  - Returns: user object, token

- POST `/api/users/login`
  - Authenticate user
  - Required fields: email, password
  - Returns: user object, token

- GET `/api/users/profile`
  - Get user profile
  - Requires: Authentication token
  - Returns: user profile data

- PUT `/api/users/profile`
  - Update user profile
  - Requires: Authentication token
  - Fields: name, email, etc.
  - Returns: updated user object

## 🔍 Testing

- Unit tests for models
- Integration tests for APIs
- Authentication testing
- Error handling testing

## 📈 Performance

- Database indexing
- Query optimization
- Caching strategies
- Load balancing ready

## 🔐 Security Best Practices

1. Data Protection
   - Encrypted passwords
   - Secure sessions
   - Data sanitization

2. Access Control
   - Role-based access
   - Token verification
   - Route protection

3. Security Headers
   - CORS policies
   - XSS protection
   - CSRF prevention