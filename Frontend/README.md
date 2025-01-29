# Fitness Gym Website Frontend

This is the frontend portion of our Fitness Gym Website, built with React and Vite. It provides a modern, responsive user interface for gym members and visitors.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Frontend/
├── public/           # Static assets
├── src/             # Source code
│   ├── assets/      # Images, fonts, and other static files
│   ├── components/  # Reusable UI components
│   │   ├── Carosoul.jsx    # Image slider component
│   │   ├── Footer.jsx     # Site-wide footer
│   │   ├── Navbar.jsx     # Navigation bar
│   │   └── index.js       # Component exports
│   ├── context/     # React Context providers
│   │   └── userContext.jsx # User authentication context
│   ├── pages/       # Application pages
│   │   ├── About.jsx       # About page
│   │   ├── Contact.jsx     # Contact form
│   │   ├── Dashboard.jsx   # User dashboard
│   │   ├── ForgotPassword.jsx # Password recovery
│   │   ├── Home.jsx        # Landing page
│   │   ├── LoginPage.jsx   # User login
│   │   ├── NotFound.jsx    # 404 page
│   │   ├── Pricing.jsx     # Membership plans
│   │   ├── RegisterPage.jsx # User registration
│   │   ├── Timetable.jsx   # Class schedules
│   │   ├── services.jsx    # Gym services
│   │   └── trainer.jsx     # Trainer profiles
│   ├── routes/      # Route configurations
│   ├── utils/       # Utility functions
│   ├── App.jsx      # Root component
│   ├── main.jsx     # Application entry
│   └── index.css    # Global styles
├── .env            # Environment variables
├── index.html      # HTML entry point
├── vite.config.js  # Vite configuration
└── tailwind.config.js # Tailwind CSS config
```

## 🎨 Components

### Core Components
- **Navbar**: Responsive navigation bar with mobile menu
- **Footer**: Site-wide footer with gym information and links
- **Carousel**: Dynamic image slider for showcasing facilities

### Page Components
1. **Home Page**
   - Hero section with call-to-action
   - Featured programs carousel
   - Testimonials section
   - Quick access to membership plans

2. **Dashboard**
   - User profile management
   - Workout tracking
   - Class bookings
   - Progress metrics

3. **Services**
   - Training programs listing
   - Class descriptions
   - Membership benefits
   - Special offers

4. **Trainers**
   - Trainer profiles and bios
   - Booking interface
   - Expertise showcase
   - Availability calendar

5. **Pricing**
   - Membership plan cards
   - Feature comparison
   - Pricing details
   - Sign-up buttons

## 🛠️ Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Flowbite React**: UI component library
- **React Router DOM**: Navigation and routing
- **Axios**: HTTP client
- **Swiper**: Touch slider
- **React Icons**: Icon library
- **Lucide React**: Icon components

## 💻 Development

### Prerequisites
- Node.js >= 14.x
- npm >= 6.x

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000 # Backend API URL
```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 🎯 Features

### User Interface
- Responsive design for all devices
- Dark/light mode support
- Smooth animations
- Interactive components

### User Management
- JWT-based authentication
- Protected routes
- Password recovery
- Profile customization

### Performance
- Code splitting
- Lazy loading
- Optimized assets
- Fast page loads

## 🔧 Configuration Files

### vite.config.js
- Development server settings
- Build optimization
- Plugin configuration

### tailwind.config.js
- Custom theme settings
- Color palette
- Typography scale
- Responsive breakpoints

### eslint.config.js
- Code style rules
- Best practices
- Error prevention

## 📚 State Management

- React Context for global state
- Local state with useState
- Form state with controlled components
- Navigation state with React Router

## 🔒 Security Features

- Protected routes
- JWT token management
- HTTP-only cookies
- XSS prevention
- CORS configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- Follow React best practices
- Use functional components
- Implement proper error handling
- Write clean, maintainable code
- Add comments for complex logic

## 📦 Dependencies Management

- Regular dependency updates
- Security vulnerability checks
- Proper version control
- Optimized bundle size

## 🚀 Deployment

1. Build the project: `npm run build`
2. Test the build: `npm run preview`
3. Deploy to your hosting platform
4. Configure environment variables
5. Set up CI/CD pipelines if needed