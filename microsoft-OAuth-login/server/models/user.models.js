import { DataTypes } from 'sequelize'
import { sequelize } from '../config/dbConnect.js'

export const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.BIGINT,
    },
    avatar: {
        type: DataTypes.TEXT
    }
},
    {

        timestamps: true
    })

