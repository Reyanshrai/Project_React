import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const pool = new Pool({
    user: process.env.POST_USER,
    host: process.env.POST_HOST,
    database: process.env.POST_DATABASE,
    password: process.env.POST_PASSWORD,
    port: process.env.POST_PORT,
});

async function connectPostGre() {
    try {
        const client = await pool.connect();
        console.log("✅ PostgreSQL has been Connected");
        client.release(); // Release connection back to the pool
    } catch (err) {
        console.error("❌ PostgreSQL Connection Error:", err);
    }
}



export  {pool,connectPostGre};
