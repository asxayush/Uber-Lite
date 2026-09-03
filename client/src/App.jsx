import { useState } from 'react'
import Home from "./components/Home"
import Register from "./components/Register"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login"
import PrivacyPolicy from "./components/PrivacyPolicy"
import Disclaimer from "./components/Disclaimer"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
