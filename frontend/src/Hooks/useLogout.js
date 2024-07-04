import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoding] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoding(true);
    try {
      const headers = { "Content-Type": "application/json" };
      const res = await axios.post("/api/auth/logout", {}, { headers });
      if (res.data.error) throw new Error(res.data.error);
      localStorage.removeItem("authUser");
      setAuthUser(null);
    } catch (e) {
      console.log("error");
    } finally {
      setLoding(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
