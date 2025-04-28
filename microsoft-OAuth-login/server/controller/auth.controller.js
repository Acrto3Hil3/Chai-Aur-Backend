import { User } from "../models/user.models.js"

export const Login = async (req, res) => {
    try {
        const { name, email, phoneNumber, avatar } = req.body
        let user = await User.findOne({ where: { email } })
        if (!user) {
            const newUser = new User({
                name, email, phoneNumber, avatar
            })
        }
        user = user.toObject({ getters: true })
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY)

        res.cookie('access token', token, {
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
            error,
        })
    }

}

export const getUser = async (req, res) => {

}