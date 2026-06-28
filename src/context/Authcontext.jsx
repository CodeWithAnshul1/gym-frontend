import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [serverWalkingUp, setServerWakingUp] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchUser = async () => {
    // const token = localStorage.getItem("token"); // ✅ get token

    // ❌ no token → not logged in
    // if (!token) {
    //   setUser(null);
    //   setLoading(false);
    //   return;
    // }
    // console.log("FETCH START");





    try {
      const res = await fetch(`${BASE_URL}/me`, {
        credentials :"include",
        headers: {
          
        },
      });
      if(res.status===401){
        // localStorage.removeItem("token");
        setUser(null);
        return;
      }

      if (!res.ok) {
        throw new Error();
        
      }

      const data = await res.json();
      setUser(data.user);

    } catch (err) {

      setUser(null);
      console.log(err);
      
    } finally {
      setLoading(false);
      // console.log("FETCH END");
    }
  };

  // ✅ run once on app load / refresh
  useEffect(() => {


  fetchUser();

  

  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, fetchUser, serverWalkingUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);