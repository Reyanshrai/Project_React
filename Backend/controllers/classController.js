import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import { pool } from '../database/postgreDb.js';

// Get DB type from environment
const DB_TYPE = process.env.DB_TYPE?.trim().toLowerCase() || 'mongo';

// Mock upcoming classes data
const upcomingClasses = [
  {
    id: 1,
    name: "HIIT Cardio",
    trainer: "John Smith",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    time: "10:00 AM",
    duration: 45, // minutes
    capacity: 20,
    enrolled: 12,
    level: "Intermediate"
  },
  {
    id: 2,
    name: "Yoga Flow",
    trainer: "Emma Johnson",
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    time: "09:00 AM",
    duration: 60, // minutes
    capacity: 15,
    enrolled: 10,
    level: "All Levels"
  },
  {
    id: 3,
    name: "Strength Training",
    trainer: "Mike Williams",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    time: "06:00 PM",
    duration: 50, // minutes
    capacity: 12,
    enrolled: 9,
    level: "Advanced"
  },
  {
    id: 4,
    name: "Pilates",
    trainer: "Sarah Davis",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    time: "05:30 PM",
    duration: 55, // minutes
    capacity: 18,
    enrolled: 14,
    level: "Beginner"
  }
];

// Get upcoming classes
export const getUpcomingClasses = asyncHandler(async (req, res) => {
  try {
    console.log("🔹 getUpcomingClasses function is executing...");
    
    // In a real app, you'd fetch this from a database and apply filters
    const classes = upcomingClasses.map(cls => ({
      ...cls,
      availableSpots: cls.capacity - cls.enrolled
    }));
    
    res.status(StatusCodes.OK).json({ classes });
  } catch (error) {
    console.error("🔴 Error in getUpcomingClasses:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// Book a class
export const bookClass = asyncHandler(async (req, res) => {
  try {
    console.log("🔹 bookClass function is executing...");
    const { classId } = req.body;
    const userId = req.user.id; // From auth middleware
    
    if (!classId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: 'Class ID is required' 
      });
    }
    
    // Find the class
    const classToBook = upcomingClasses.find(c => c.id === parseInt(classId));
    if (!classToBook) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        error: 'Class not found' 
      });
    }
    
    // Check if class is full
    if (classToBook.enrolled >= classToBook.capacity) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: 'Class is already full' 
      });
    }
    
    // In a real app, increment the enrolled count and save to database
    // For this mock version, we'll just increment it in memory
    classToBook.enrolled += 1;
    
    if (DB_TYPE === 'mongo') {
      // MongoDB logic
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ 
          error: 'User not found' 
        });
      }
      
      // Add class to user's booked classes if it doesn't exist already
      if (!user.bookedClasses) {
        user.bookedClasses = [];
      }
      
      // Check if user already booked this class
      const alreadyBooked = user.bookedClasses.some(
        booking => booking.classId === classId
      );
      
      if (alreadyBooked) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          error: 'You have already booked this class' 
        });
      }
      
      // Add booking
      user.bookedClasses.push({
        classId: classToBook.id,
        className: classToBook.name,
        date: classToBook.date,
        time: classToBook.time,
        bookingDate: new Date()
      });
      
      await user.save();
      
      return res.status(StatusCodes.OK).json({
        message: 'Class booked successfully',
        booking: user.bookedClasses[user.bookedClasses.length - 1]
      });
    } else {
      // PostgreSQL logic
      const client = await pool.connect();
      try {
        // Check if user exists
        const userResult = await client.query(
          'SELECT id FROM users WHERE id = $1',
          [userId]
        );
        
        if (!userResult.rows.length) {
          return res.status(StatusCodes.NOT_FOUND).json({ 
            error: 'User not found' 
          });
        }
        
        // Check if bookings table exists, if not create it
        await client.query(`
          CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            class_id INTEGER NOT NULL,
            class_name TEXT NOT NULL,
            class_date TIMESTAMP NOT NULL,
            class_time TEXT NOT NULL,
            booking_date TIMESTAMP NOT NULL,
            UNIQUE(user_id, class_id)
          )
        `);
        
        // Check if user already booked this class
        const bookingCheck = await client.query(
          'SELECT id FROM bookings WHERE user_id = $1 AND class_id = $2',
          [userId, classId]
        );
        
        if (bookingCheck.rows.length > 0) {
          return res.status(StatusCodes.BAD_REQUEST).json({ 
            error: 'You have already booked this class' 
          });
        }
        
        // Add booking
        const bookingResult = await client.query(
          `INSERT INTO bookings (
            user_id, class_id, class_name, class_date, class_time, booking_date
          ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
          [
            userId,
            classToBook.id,
            classToBook.name,
            classToBook.date,
            classToBook.time,
            new Date()
          ]
        );
        
        const booking = bookingResult.rows[0];
        
        return res.status(StatusCodes.OK).json({
          message: 'Class booked successfully',
          booking: {
            id: booking.id,
            classId: booking.class_id,
            className: booking.class_name,
            date: booking.class_date,
            time: booking.class_time,
            bookingDate: booking.booking_date
          }
        });
      } catch (error) {
        if (error.code === '23505') { // Unique violation in Postgres
          return res.status(StatusCodes.BAD_REQUEST).json({ 
            error: 'You have already booked this class' 
          });
        }
        console.error("🔴 Error in bookClass PostgreSQL:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
          error: 'Database error' 
        });
      } finally {
        client.release();
      }
    }
  } catch (error) {
    console.error("🔴 Error in bookClass:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}); 