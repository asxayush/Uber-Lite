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
    },

    isEmailVerified: {
            type: Boolean,
            default: false,
        },
    refreshToken: {
            type: String,
        },
    forgotPasswordToken: {
            type: String,
        },
    forgotPasswordExpiry: {
            type: Date,
        },
    emailVerificationToken: {
            type: String,
        },
    emailVerificationExpiry: {
            type: Date,
        },
    
},
    {timestamps: true}
)  

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password, 10)
    next()
} )


userSchema.methods.comparePassword = async function(password)  {
    
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
  return  jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


const userModel = mongoose.model('user', userSchema)

export default userModel