import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

export default function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email:"",
        password:""
    })

    const handlerSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:4000/login", {
                ...values
            },
            {withCredentials:true}
            );
            if(data.token) {
                navigate("/")
            }

        } catch (err) {
            console.log('CHEGOU AQUI')
            console.log(err)
            toast.error(err.response.data.error)
        }
    }

  return(
    <div className="container">
        <h2>Login</h2>
        <form onSubmit={(e) => handlerSubmit(e)}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email"
                 onChange={(e) =>
                    setValues({...values, [e.target.name]: e.target.value})
                }
            />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password"
                onChange={(e) =>
                  setValues({...values, [e.target.name]: e.target.value})
              }
                />
            </div>
            <button type="submit">Submit</button>
            <span>
                Doesn't have an account? <Link to="/register">Register</Link>
            </span>
        </form>
        <ToastContainer />
    </div>
  )
};