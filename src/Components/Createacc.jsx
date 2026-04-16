import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Createacc() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [tenantId , settenantId] =useState("");
    const [loading , setLoading] = useState(false);
    const [showpass , setshowpass] = useState(false);
    const navigate = useNavigate();
    const BASE_URL=import.meta.env.VITE_API_URL;
    

    const handlecreate = async (e) => {
      e.preventDefault();
      try{
        setLoading(true);
          const res = await fetch(`${BASE_URL}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password ,tenantId }),
        });
        const data =await res.json();
        if(res.ok){
            
            setPassword("");
            setEmail("");
            toast.success(data.message);
            // localStorage.setItem("role",data.role);
            const timer =setTimeout(() => {
              navigate("/");
              return clearTimeout(timer) ;       
            },1000);
          }
          else{
            toast.error(data.message);
          }
        }
        catch(err){
          toast.error("something went wrong");

        }
        finally{
          setLoading(false);
        }
    };
  
    return (
      <div className="flex justify-center items-center h-screen bg-[#020617]">
  
        <form
          onSubmit={handlecreate}
          className="bg-[#111827] p-8 rounded-xl shadow-md w-80 space-y-4 text-white"
        >
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
  
          <input
            type="email"
            placeholder="Enter email"
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
            <div className='relative'>

          <input
            type={showpass ?"text" :"password"}
            placeholder="Enter Password"
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <span
            onClick={()=>setshowpass(!showpass)}
            className='absolute right-3 top-2.5 '>
                {showpass ? <FaEyeSlash /> : <FaEye /> }
            </span>
            </div>
            <input
            type ="text"
            placeholder='gym Id'
            value={tenantId}
            onChange={(e)=>settenantId(e.target.value)}
            className='p-2 border w-full'
            />
  
         <button
             type="submit"
             disabled={loading}
             className="w-full bg-[#22C55E] text-white py-2 rounded-md hover:font-bold transition disabled:opacity-50"
              >
            {loading ? "Creating..." : "Create Account"}
        </button>

       
  
        </form>
  
      </div>
    );
  
}
