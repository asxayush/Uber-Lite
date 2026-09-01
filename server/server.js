import http from 'http'
import app from './app.js'

import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import connectDB from "./src/db/db.js";


const port = process.env.PORT || 3000

connectDB()
.then(() => {
  app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

})
.catch((err) => {
  console.error("MONGODB CONNECTION ERROR", err);
  process.exit(1)
  
})
