
import dotenv from "dotenv"
dotenv.config()

import express from "express";
import cors from "cors"

import healthCheckRouter from "./routes/healthcheck.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);

const app = express()
app.use(cors())

app.get('/', 
    (req, res) => {
        res.send("Hello World")
    }
)

export default app