import { useState } from 'react'
import Navbar from "./Components/Navbar";
import './App.css'
import AppRoutes from './Components/AppRoutes';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from './context/Authcontext';



export default function App() {
  const {user,loading,serverWalkingUp } =useAuth();
  if (loading) {
  return (
    <div className="h-screen flex items-center justify-center bg-[#020617] text-white">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
  return (
    <>
    { user&&<Navbar />}
   <AppRoutes />
   <ToastContainer
  position="top-right"
  theme="dark"
  autoClose={1000}
  style={{ top: "50px" ,width :"100%"}}   // pushes below navbar
  toastStyle={{
    minHeight: "40px",      // controls height
    fontSize: "16px",
    width:"100%",
    maxHeight :"400px"
  }}
/> 
    </>
  )
}
