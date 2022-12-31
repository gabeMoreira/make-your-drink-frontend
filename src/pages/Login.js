import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, Toast } from "react-toastify";
import axios from 'axios'

export default function Login() {
    const [values, setValues] = useState({
        email:"",
        password:""
    })

    const handlerSubmit = (e) => {
        e.preventDefault();
    }

  return(
    <div className="container">
        <h2>Login</h2>
        <form onSubmit={(e) => handlerSubmit(e)}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email"
                 onChange={(e) =>
                    setValues({...values, [e.target.email]: e.target.value})
                }
            />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password"
                onChange={(e) =>
                  setValues({...values, [e.target.password]: e.target.value})
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