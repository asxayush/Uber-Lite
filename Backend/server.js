import http from 'http'
import app from './app.js'

import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import connectDB from "./src/db/db.js";


connectDB()


const port = process.env.PORT  || 3000

const server =http.createServer(app)

server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
    
})