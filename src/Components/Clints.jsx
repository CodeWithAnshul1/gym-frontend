import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {useAuth}from "../context/Authcontext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, Setsearch] = useState("");
  const [msg, setmsg] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, settotalPage] = useState(1);
  const [fee ,setfee] =useState(null);
  const[month ,setmonth] =useState("");
    const {user}= useAuth();

  const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role");

  const navigate = useNavigate();
  const limit = 6;
  const BASE_URL = import.meta.env.VITE_API_URL;

  // ✅ FIX: proper role check
   const isAdmin =
  user && (user.role === "admin" || user.role === "superadmin");

  useEffect(() => {
    let timer;

    if (search.trim() === "") {
      setmsg("");
      showusers();
    } else {
      timer = setTimeout(() => {
        setmsg("");
        searchusr();
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [search, page]);
// console.log(token);
  const searchusr = async () => {
    try {
      const res = await fetch(`${BASE_URL}/search?page=${page}&limit=${limit}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ added
        },
        body: JSON.stringify({ search }),
      });

      const data = await res.json();

      if (!res.ok || data.message) {
        setmsg(data.message || "No users found");
        setUsers([]);
        setTimeout(() => setmsg(""), 3000);
      } else {
        setUsers(data.users);
        settotalPage(data.totalPages);
      }

    } catch (err) {
      console.log(err);
      toast.error("Search failed");
    }
  };
  const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
const isExpired = (date) => {
  if (!date) return false;

  const exp = new Date(date);
  if (isNaN(exp)) return false;

  return exp < new Date();
};

  const showusers = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/clints?page=${page}&limit=${limit}`, {
        headers: {
          "Authorization": `Bearer ${token}`, // ✅ added
        },
      });

      const data = await res.json();
      setUsers(data.users);
      settotalPage(data.totalPages);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const Delete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, // ✅ added
        },
     
      });
      const data =await res.json();
      if (res.ok) {
        toast.success("User deleted successfully");
        showusers();
      } else {
        toast.error("Delete failed");
      }

    } catch (err) {
      toast.error("Something went wrong");
    }
  };


  const extendfee = async(id) =>{
    try{

      const res = await fetch(`${BASE_URL}/extendfee/${id}`,{
        method :"PUT",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
           body:JSON.stringify({
          month,
        })
      });

      const data = await  res.json();
      if(res.ok){
        setfee(null);
        toast.success(data.message);
        showusers();
        setmonth("");
      }
      else{
        toast.error("try again !");
      }
      
    }catch(err){
      toast.error(err);

    }

  }

  return (
    <>
   return (
  <div className="bg-[#020617] min-h-screen text-white flex flex-col scrollbar-hidden">

    {/* SEARCH */}
    <div className="flex justify-center items-center h-[20vh]">
      <div className="w-[80%] flex">
        <input
          type="text"
          placeholder="Enter user name"
          value={search}
          onChange={(e) => {
            Setsearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 p-2 border border-gray-400 rounded-l bg-transparent text-white"
        />

        <button
          onClick={searchusr}
          className="bg-blue-500 text-white px-2 py-2 rounded-r text-xl"
        >
          🔍
        </button>
      </div>
    </div>

    {/* CONTENT */}
    <div className="flex-1">
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="text-center text-xl">{msg}</div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 pb-24">
            {users.map((user) => (
              <div
                key={user._id}
                className="mx-auto w-[80%] p-5 space-y-3 bg-[#111827] rounded-xl font-semibold border border-[#1F2937]"
              >
                <p>Name: {user.name}</p>
                <p>Phone: {user.number}</p>
                <p>Address: {user.add}</p>
                <p>EntryDate: {formatDate(user.entrydate)}</p>

                <p
                  className={`${
                    isExpired(user.expiredate)
                      ? "text-red-500 font-bold"
                      : "text-green-500"
                  }`}
                >
                  {isExpired(user.expiredate)
                    ? "Expired on: "
                    : "Valid till: "}
                  {formatDate(user.expiredate)}
                </p>

                {isAdmin && (
                  <>
                    <button
                      onClick={() => setfee(user._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Add fee
                    </button>

                    <button
                      onClick={() => Delete(user._id)}
                      className="ml-3 bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                    {fee === user._id && (
                      <div className="mt-2 space-y-2">
                        <input
                          type="number"
                          placeholder="enter months"
                          min={1}
                          value={month}
                          onChange={(e) => setmonth(e.target.value)}
                          className="w-full border p-2 rounded-md bg-transparent text-white"
                        />

                        <button
                          onClick={() => extendfee(user._id)}
                          className="bg-green-500 px-3 py-1 rounded"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>

    {/* PAGINATION */}
    <div className="fixed bottom-0 left-0 w-full bg-[#020617] p-3 flex justify-between border-t border-[#1F2937]">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="flex items-center bg-[#111827] p-2 rounded-lg gap-2 border border-[#1F2937]"
      >
        <FaArrowLeft /> Prev
      </button>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPage}
        className="flex items-center bg-[#111827] p-2 rounded-lg gap-2 border border-[#1F2937]"
      >
        Next <FaArrowRight />
      </button>
    </div>

  </div>
);
    </>
  );
}