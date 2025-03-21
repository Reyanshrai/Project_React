import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import connectMongoDB from './database/mongoDb.js' //mongodb
import {connectPostGre} from './database/postgreDb.js' //postgreSql
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import memberRoutes from './routes/memberRoutes.js'
import trainerRoutes from './routes/trainerRoutes.js'
import subscriptionRoutes from './routes/subscriptionRoutes.js'
import dietPlanRoutes from './routes/dietPlanRoutes.js'
import classRoutes from './routes/classRoutes.js'


// Load environment variables first
dotenv.config()

// Initialize express app
const app = express()

// Connect to Databases
connectMongoDB()
connectPostGre()

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
app.use('/admins',adminRoutes)
app.use('/members',memberRoutes)
app.use('/trainers',trainerRoutes)
app.use('/api/subscriptions',subscriptionRoutes)
app.use('/api/diet-plans',dietPlanRoutes)
app.use('/api/classes',classRoutes)


export default app;