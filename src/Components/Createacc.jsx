import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Createacc() {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tenantId, settenantId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showpass, setshowpass] = useState(false);
  const [showotpbox, setotpbox] = useState(false);
  const [otp, setotp] = useState("");

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handlecreate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/send-singup-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type:"signup",
          email,
          password,
          tenantId
        })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setotpbox(true);
      } else {
        toast.error(data.message);
      }

    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const verifyotp = async() => {
    try{
      setLoading(true);
      const res= await fetch(`${BASE_URL}/verify-otp`,{
        "method":"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(
         {
           tenantId,
          email,
          otp,
          type :"signup",
         }
        )
      });

      const data = await res.json();
      if(res.ok){
        toast.success(data.message);
      }
     
      const timer =setTimeout(()=>{
        navigate("/");
        return clearTimeout(timer);
      },1000);

    }catch(err){
      toast.error(err.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#020617]">

      <form
        onSubmit={handlecreate}
        className="bg-[#111827] p-8 rounded-xl shadow-md w-80 space-y-4 text-white"
      >

        <h2 className="text-2xl font-bold text-center">
          Create Account
        </h2>

        {!showotpbox ? (

          <>
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded-md"
            />

            <div className="relative">

              <input
                type={showpass ? "text" : "password"}
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded-md"
              />

              <span
                onClick={() => setshowpass(!showpass)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showpass ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

            <input
              type="text"
              placeholder="Gym ID"
              value={tenantId}
              onChange={(e) => settenantId(e.target.value)}
              className="w-full border p-2 rounded-md"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#22C55E] py-2 rounded-md"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

          </>

        ) : (

          <>
            <input
              type="text"
              placeholder="Enter 6 digit OTP"
              value={otp}
              onChange={(e)=>setotp(e.target.value)}
              className="w-full border p-2 rounded-md"
            />

            <button
              type="button"
             maxLength={6}
              onClick={verifyotp}
              className="w-full bg-[#22C55E] py-2 rounded-md"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>

        )}

      </form>

    </div>
  );
}