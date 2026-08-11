
import dotenv from "dotenv"
dotenv.config()

import express from "express";
import cors from "cors"

import { healthCheck } from "./src/controllers/healthcheck.controllers.js";

const app = express()
app.use(cors())

app.get('/', 
    (req, res) => {
        res.send("Hello World")
    }
)

import healthCheckRouter from "./src/routes/healthcheck.routes.js"
app.use("/api/v1/healthcheck", healthCheckRouter);

export default app