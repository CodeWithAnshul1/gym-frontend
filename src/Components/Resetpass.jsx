import { useLocation ,useNavigate } from "react-router-dom"
import {useState} from "react";
import {toast} from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Resetpass() {
    const {state}=useLocation();
    const navigate =useNavigate();
    // const {email ,tenantId}=state ||{};
    const email =localStorage.getItem("resetEmail");
    const tenantId=localStorage.getItem("resetTenant");
    const BASE_URL=import.meta.env.VITE_API_URL;
    const [showpass , setshowpass]= useState(false);
    const [password , setPassword]=useState("");
    const [conform , setConform] =useState("");
    const [loading , setloading ]=useState(false);
    // console.log({ email, tenantId });

    const handleReset =async(e)=>{
      e.preventDefault();
      if(password != conform){
        return toast.error("enter same password");
      }
      try{
        setloading(true);
        const res = await fetch(`${BASE_URL}/new-pass`,{
          method :"POST",
          headers:{
            "Content-Type" :"application/json",
          },
          body:JSON.stringify({
            email,
            tenantId,
            password,
          }),
        });

        const data = await res.json();
        if(res.ok){
          toast.success(data.message);
          navigate("/");
        }
      }
      catch(err){
        toast.error(err.message);
      }finally{
        setloading(false);

      }


    }

    

  return (
   <div className="flex items-center justify-center h-screen bg-[#020617]">

      <div className="bg-[#111827] p-6 rounded-xl w-80 space-y-4 text-white relative">

        <h2 className="text-xl font-bold text-center">Reset Password</h2>

        {/* Password */}
        <div className="relative">
          <input
            type={showpass ? "text" : "password"}
            placeholder="New Password"
            required
            className="w-full border p-2 rounded-md bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setshowpass(!showpass)}
            className="absolute right-3 top-2.5 cursor-pointer"
          >
            {showpass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showpass ? "text" : "password"}
            placeholder="Confirm Password"
            required
            className="w-full border p-2 rounded-md bg-transparent"
            value={conform}
            onChange={(e) => setConform(e.target.value)}
          />
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-green-500 py-2 rounded-md hover:font-bold"
        >
          {loading ?"updating":"update password"}
        </button>

      </div>
    </div>
  );
}
