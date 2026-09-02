import React from "react";

function Home(){

    return (
     <>
        <div className="bg-gray-800 text-amber-50 border-r-amber-700 flex justify-between m-4 p-1 list-none">
        <li> Register</li>
        <li> Login</li>
        <li> Home</li>
      </div>  



      <div className="bg-gray-800 flex-grow min-h-screen flex flex-col" >
        <footer className="footer list-none justify-evenly m-4 p-2 text-amber-50 ">
            <p>&copy; 2026 Uber-Lite All rights reserved</p>
            <li>Disclaimer</li>
            <li>Privacy Policy</li>
        </footer>
        
    </div >  
    
     </>
    )
}

export default Home