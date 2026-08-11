import {ApiResponse} from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"

// basic of health check sirf "main zinda hoon" bolna hai (ya, better version mein, "main zinda hoon AUR mera DB bhi connected hai"

const healthCheck = asyncHandler(async (req, res) => {
    const dbState = mongoose.connection.readyState; // 1 = connected
    
    if (dbState !== 1) {
        throw new ApiError(503, "Database not connected");
    }
    
    res.status(200).json(
        new ApiResponse(200, { message: "Server is running", db: "connected" })
    );
});

export {healthCheck}