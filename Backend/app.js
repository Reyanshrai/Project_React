import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './database/db.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'


// Load environment variables first
dotenv.config()

// Initialize express app
const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cookieParser())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Or whichever origins you need
    // ... other headers
    next();
});

app.get('/',(req,res) => {
    res.send("Hlo Backend")
})

app.use('/users',userRoutes)


export default app;