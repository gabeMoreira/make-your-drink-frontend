import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Secret() {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies([])
  useEffect(() => {
    const verifyToken = async () => {
      console.log('CHEGOU AQUI')
      console.log(cookies)
      if(!cookies.jwt){
        navigate("/login")
      } else {
        const { data } = await axios.post("http://localhost:4000", {}, {withCredentials:true});
        if(!data.status) {
          removeCookie("jwt")
          navigate("/login")
        } else {
          alert(`HI, you're in`)
        }
      }
    }
    verifyToken()
  }, [cookies, navigate, removeCookie])

  const logout = async () => {
    removeCookie("jwt")
    navigate("/login")
  }

  return (
    <div className="private">
      <h1>Super secret page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
};