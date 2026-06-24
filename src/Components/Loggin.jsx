import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Loggin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tenantId , settenantId] =useState("");
  const [showpass , setshowpass] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [loading ,setloading]=useState(false);

  const { fetchUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password , tenantId }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // localStorage.setItem("token", data.token);
      await fetchUser();
      // console.log(data.token);

      toast.success("Login successful");
      navigate("/clint");

    } catch (err) {
      toast.error("Something went wrong");
    }
    finally{
      setloading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex justify-center items-center
        bg-[url('/bg.png')]       /* mobile image */
        md:bg-none                /* remove image on desktop */
        bg-contain bg-no-repeat
        bg-[#020617]             /* desktop color */
        relative
      "
    >
      {/* 🔥 overlay only on mobile */}           
      <div className="absolute inset-0 bg-black/60 md:hidden"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-[#111827]/80 backdrop-blur-md p-8 rounded-xl shadow-md w-80 space-y-4 text-white"
      >
        <h2 className="text-2xl font-bold text-center">Login please</h2>

        <input
          type="email"
          placeholder="Enter email"
          required
          className="w-full border p-2 rounded-md bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
        <input
          type={showpass ?"text":"password"}
          placeholder="Enter Password"
          required
          className="w-full border p-2 rounded-md bg-transparent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
        onClick={()=>setshowpass(!showpass)}
        
        className="absolute right-3 top-2.5 cursor-pointer text-gray-300"
        >
        {showpass ? <FaEyeSlash /> : <FaEye />}
          
        </span>
        </div>
        <input
        type="text"
        placeholder="gym Id"
        required
        value={tenantId}
        className="w-full border  p-2 rounded-md "
        onChange={(e)=> settenantId(e.target.value)}

        />

       <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#22C55E] py-2 rounded-md"
>
  Sign in
</button>

<div className="flex flex-col  space-y-2 text-sm mt-2">
  <button
    type="button"
    onClick={() => navigate("/forgot")}
    className="text-gray-300 hover:text-white"
  >
    Forgot Password?
  </button>

  <button
    type="button"
    onClick={() => navigate("/createacc")}
    className="text-blue-400 hover:underline"
  >
    Create account
  </button>
</div>
      </form>
    </div>
  );
}