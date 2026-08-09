import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name should be at least of 3 characters']
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, 'Last name should be at least of 3 characters']
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        minlength: [5, 'email must be at least 5 characters long']
    },

    socketId: {
        type: String,
    }

})  

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET)
    return token
}

userSchema.methods.comparePassword = async function(password)  {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('user', userSchema)

export default userModel