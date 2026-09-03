import { handleGoogleSignIn } from "../firebase.js";
import React, { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Listens for login/logout changes and updates state
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    const handleGoogleClick = async () => {
        const user = await handleGoogleSignIn();
        if (user) {
            navigate("/rider/dashboard"); // ya jahan bhi successful signup ke baad bhejna hai
        }
    };



    const logout = () => signOut(auth);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // page reload rokta hai

        try {
            const response = await axios.post(
                "http://localhost:3000/register/rider", // apna backend URL daalo
                formData
            );

            console.log(response.data);
            navigate("/login"); // success pe login page pe bhej do
        } catch (err) {
            console.error(err);
            // yahan error state set karke user ko dikha sakte ho
        }


    };
    return (
        <>
            <div className="register-container flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Register as a Rider</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="you@example.com"
                                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                placeholder="••••••••"
                                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-md transition"
                        >
                            Register
                        </button>


                    </form>

                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                        {user ? (
                            <div>
                                <h2>Welcome, {user.displayName}!</h2>
                                <img src={user.photoURL} alt="Profile" style={{ borderRadius: "50%" }} />
                                <p>Email: {user.email}</p>
                                <button onClick={logout}>Sign Out</button>
                            </div>
                        ) : (
                            <div>
                               <button
                                     onClick={handleGoogleClick}
                                     className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-md py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition shadow-sm"
                                            >
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
  <span>Sign up with Google</span>
</button>
                            </div>
                        )}
                    </div>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-medium hover:underline">
                            Login
                        </Link>


                    </p>
                </div>
            </div>
        </>
    )
}

export default Register