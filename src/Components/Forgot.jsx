import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Forgot() {
  const BASE_URL=import.meta.env.VITE_API_URL;
  const navigate =useNavigate();
  const [email , setemail]=useState("");
  const [tenantId , settenantId]=useState("");
  const [otp , setotp]=useState("");
  const [open, setopen] =useState(false);
  const[loading ,setloading]=useState(false);
  // const type= "forgot";


  const handlesubmit =async(e)=>{
    e.preventDefault();
    try{
     
      setloading(true);

      
      const res = await fetch(`${BASE_URL}/send-singup-otp`,{
      method:"POST",
      headers:{
        "Content-Type" :"application/json",
      },
      body: JSON.stringify({
        tenantId,
        type :"forgot",
        email,
      }),
    });
    const data = await res.json();
    
    if(res.ok){
      toast.success(data.message);
       setopen(true);
    }
  }
  catch(err){
    toast.error(err.message || "Something went wrong");
  }finally{
    setloading(false);
  }

 
  }
   const verify = async()=>{
    try{
      setloading(true);

      const res = await fetch(`${BASE_URL}/verify-otp`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          email,
          tenantId,
          type:"forgot",
          otp,
        })
        
      });
      const data = await res.json();
      if(res.ok){
        toast.success(data.message);

        localStorage.setItem("resetEmail", email);
        localStorage.setItem("resetTenant", tenantId);
        const timer =setTimeout(()=>{
          navigate("/reset-pass",{
            state:{email,tenantId}
          });
          return clearTimeout(timer);
        },1000)
      }else{
        toast.error(data.message);
      }
    }catch(err){
       toast.error(err);

    }finally{
      setloading(false);

    }
      
  }

  return (
    <>
    <div className="flex  h-screen justify-center bg-[#020617]">
      <div className="">
        
      <form 
      // onSubmit={handlesubmit}
      className=" mt-40 h-auto bg-[#111827]/80 backdrop-blur-md p-8 rounded-xl shadow-md w-80 space-y-4 text-white">
        
        <h3>forgot password</h3>
        { !open ?(
          <>
        <input
        type="email"
        placeholder="enter email"
        value={email}
        required
        onChange={(e)=>setemail(e.target.value)}
        className="w-full border  rounded-md p-2 bg-transparent"
        />
        <input
        type="text"
        placeholder="gym id"
        required
        value={tenantId}
        onChange={(e)=>settenantId(e.target.value)}
        className="w-full border  rounded-md p-2 bg-transparent"
        />

        </>
        )
        :(
          <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e)=>setotp(e.target.value)}
          className="border w-full p-2 rounded-md"
          placeholder="enter 6 digit otp"/>
        )}
        {!open ?(<button
      type="submit"
      onClick={handlesubmit}
      
      className=" ml-20 py-3 px-5 bg-blue-500 rounded-lg text-white"
      >{loading ?"sending..." :"send"}</button>)
      :(<button
      type="button"
      onClick={verify}
      className=" ml-20 py-3 px-5 bg-blue-500 rounded-lg text-white"
      >{loading ?"verifying..." :"verify"}</button>)}
      
      
    
       
      </form>
      </div>
      
    </div>
          </>
  )
}
