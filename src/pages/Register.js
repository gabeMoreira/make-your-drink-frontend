import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: "",
        name: "",
        password: ""
    })

    const messageNotification = (message) => {
        toast(message);
    };

    const errorGenerator = (error) => {
        toast.error(error.data[0].message)
    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const body = { ...values };
        const response = await fetch('http://localhost:4000/users', {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json()
        if (response.status === 201) {
            console.log('AQUI: ', data)
            messageNotification(data.message);
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        } else {
            errorGenerator(data)
        }
    }

    return (
        <div className="container">
            <h2>Register Account</h2>
            <form onSubmit={(e) => handlerSubmit(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Email"
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <div>
                    <label>Name</label>
                    <input name="name" placeholder="Name"
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password"
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <button type="submit">Submit</button>
                <span>
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
};