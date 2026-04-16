import { useState } from 'react'
import Navbar from "./Components/Navbar";
import './App.css'
import AppRoutes from './Components/AppRoutes';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from './context/Authcontext';



export default function App() {
  const {user,loading } =useAuth();

  if(loading) return null;
  return (
    <>
    {user &&<Navbar />}
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
