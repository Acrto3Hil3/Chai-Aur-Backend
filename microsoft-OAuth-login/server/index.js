import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import { sequelize } from './config/dbConnect.js';
import { authRouter } from './router/auth.routes.js';

dotenv.config()

const PORT = process.env.SERVER_PORT

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use('/api/auth', authRouter)


app.listen(PORT, (err) => {
    console.log(`Server running on http://localhost:${PORT}`)
})

sequelize.sync({ alter: true })
    .then(() => {
        console.log(`Database synchronized successfully..`)
    })
    .catch((err) => {
        console.log(`Database connection failed: ${err.message}`);

    })
