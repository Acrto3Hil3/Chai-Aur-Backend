import { User } from "../models/user.models.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const Login = async (req, res) => {
    try {
        console.log('Login API called..')
        // console.log(req.body)
        const { name, email, phoneNumber, avatar } = req.body; // Extract fields from req.body
        let user = await User.findOne({ where: { email } });
        if (!user) {
            user = await User.create({ name, email, phoneNumber, avatar }); // Save new user to the database
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY); // Use specific fields for token

        res.cookie('access_token', token, {
            httpOnly: true
        })

        res.status(200).json({
            message: 'User login successfully..',
            success: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })
    }

}

export const getUser = async (req, res) => {

}