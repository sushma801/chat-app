import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoding] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async ({ userName, password }) => {
    setLoding(true);
    try {
      const headers = { "Content-Type": "application/json" };
      const userData = { userName, password };
      const res = await axios.post(
        "/api/auth/login",
        JSON.stringify(userData),
        { headers }
      );
      if (res.data.error) throw new Error(res.data.error);
      localStorage.setItem("authUser", JSON.stringify(res.data));
      setAuthUser(res.data);
    } catch (e) {
      console.log("error");
    } finally {
      setLoding(false);
    }
  };
  return { loading, login };
};

export default useLogin;
