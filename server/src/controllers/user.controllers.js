import userModel from "../models/user.models.js";
import {ApiResponse} from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"
import {ApiError} from "../utils/api-error.js"
import jwt from "jsonwebtoken";



const registerUser = asyncHandler (async (req, res, next) => {
   const {email, fullName, password, phone} = req.body
})