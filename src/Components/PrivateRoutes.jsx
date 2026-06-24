import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function PrivateRoutes({ children }) {
  const {loading , user}=useAuth();
   if(!user){
   return <Navigate to="/"/>;
  }

  // ✅ token exists → allow access
  return children;
}