import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Secret() {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies([])
  useEffect(() => {
    const verifyToken = async () => {

      if (!cookies.jwt) {
        navigate("/login")
      } else {
        const response = await fetch("http://localhost:4000/", {
          method: "GET", credentials: "include", headers: new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Authorization': `Bearer ${cookies.jwt}`,
            'Content-Type': 'application/json',
          })
        });

        const data = await response.json()

        if (response.status != 200) {
          console.log('CHEGOU AQUI 2')
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