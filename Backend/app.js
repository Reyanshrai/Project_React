import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './database/db.js'

// Load environment variables first
dotenv.config()

// Initialize express app
const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/',(req,res) => {
    res.send("Hlo Backend")
})


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})