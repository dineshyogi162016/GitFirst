import React, { useEffect, useState } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import SignupDetails from "./Components/SignupDetails";
import Parent from "./Components/Multipage Profile/Parent";
import MyProfile from "./Components/MyProfile";

const MainPage = ()=>{
   const [logindata, setlogindata] = useState({});
   const [checkloginn, setcheckloginn] = useState(0);


   useEffect(()=>{
      const logdata = JSON.parse(sessionStorage.getItem("LoginData"))|| {}
      setlogindata(logdata)

      const checklogin = Object.entries(logdata).length;
      setcheckloginn(checklogin);

   },[])
   return(
      <>
      {checkloginn > 0 && 
         <Navbar />
      }
      <Routes>
         <Route path="/" element={<Login/> } />
         <Route path="/signup" element={<Signup/> } />
         <Route path="/home" element={<Home />} />
         <Route path="/SignupDetails" element={<SignupDetails />} />
         <Route path="/profile" element={<MyProfile /> } />
      </Routes>
      </>
   )
}

export default MainPage