import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'



const userSchema = new mongoose.Schema(
  {
    name:{
        type: String,
        required: [true, "Name is required"]

    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true
    },
    phone:{
        type: Number,
        optional: true,
        unique: [true, "Phone number already exists"]
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
  { timestamps: true }
);


// Pre-save hook to hash the password before saving the user document
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password, 10)
    next()
} )

// Method to compare the provided password with the hashed password in the database
userSchema.methods.comparePassword = async function(password)  {
    
    return await bcrypt.compare(password, this.password)
}

// Method to generate an access token for the user
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

// Method to generate a refresh token for the user
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

// Method to generate a temporary token for password reset or email verification
userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex")

    const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex")
    

    const tokenExpiry = Date.now() + (20*60*1000) // 20 mins

    return {unHashedToken, hashedToken, tokenExpiry}
}


const userModel = mongoose.model('user', userSchema)

export default userModel