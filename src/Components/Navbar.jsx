import React from 'react';
import { Link } from "react-router-dom";
import Menubar from './Menubar';
import { useAuth } from "../context/Authcontext";
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const { user } = useAuth();
  // const token = localStorage.getItem("token");

  // ✅ clean role check
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  return (
   
    <div className='flex h-12.5 fixed top-0 w-full items-center justify-between xl:space-x-4 p-4 px-5 bg-[#020617] text-[#F9FAFB] '>

      {/* ✅ Only admin/superadmin can see */}
      {isAdmin && (
       <NavLink
  to="/add"
  className={({ isActive }) =>
    isActive
      ? "text-[#22C55E] "
      : ""
  }
>
  Add Client
</NavLink>
      )}

       <NavLink
  to="/clint"
  className={({ isActive }) =>
    isActive
      ? "text-[#22C55E] "
      : ""
  }
>
  Clients
</NavLink>

      <Menubar />

    </div>
  );
}