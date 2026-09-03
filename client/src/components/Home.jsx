import React from "react";

function Home(){

    return (
     <>
        <div className="bg-gray-800 text-amber-50 border-r-amber-700 flex justify-between m-4 p-1 list-none">
        <li> <a href="/" className="text-amber-50 hover:text-amber-300">Home</a> </li>
        <li> <a href="/register" className="text-amber-50 hover:text-amber-300">Register</a> </li>
        <li> <a href="/login" className="text-amber-50 hover:text-amber-300">Login</a> </li>
        
      </div>  
        


      <div className="bg-gray-800 flex-grow min-h-screen flex flex-col" >
        <footer className="footer list-none justify-evenly m-4 p-2 text-amber-50 ">
            <p>&copy; 2026 Uber-Lite All rights reserved</p>
            <li> <a href="/disclaimer" className="text-amber-50 hover:text-amber-300">Disclaimer</a> </li>
            <li> <a href="/privacy" className="text-amber-50 hover:text-amber-300">Privacy Policy</a> </li>
        </footer>
        
    </div >  
    
     </>
    )
}

export default Home