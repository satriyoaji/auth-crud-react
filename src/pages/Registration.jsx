import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import InstanceAxios from '../components/axios'



function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirm_password, setPasswordConfirmation] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate()
    
    const handleSave = () => {
        setIsSaving(true);
        InstanceAxios.post('/auth/register', {
            name: name,
            email: email,
            password: password,
            confirm_password: confirm_password
          })
          .then(function (response) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token);
            Swal.fire({
                icon: 'success',
                title: 'User saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
            navigate("/")
            setName('')
            setEmail('')
            setPassword('')
            setPasswordConfirmation('')
          })
          .catch(function (error) {
            let errorMessage = ''
            if (error.response?.data?.errors) {
                let errorObject = error.response?.data?.errors
                Object.keys(errorObject).forEach(key => {
                    // console.log(key, obj[key]);
                    errorMessage += errorObject[key] + ' '
                });
            }
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                text: errorMessage,
                showConfirmButton: false,
                timer: 2000
            })
            setIsSaving(false)
          });
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Create new account</h5>
                                <form>
                                    <div className="form-floating mb-3">
                                        <input 
                                            value={name}
                                            onChange={(event)=>{setName(event.target.value)}}
                                            type="text" 
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Jhon Joe" 
                                        />
                                        <label htmlFor="floatingInput">Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input 
                                        value={email}
                                        onChange={(event)=>{setEmail(event.target.value)}}
                                        type="email" 
                                        className="form-control" 
                                        id="email" 
                                        placeholder="name@example.com" />
                                        <label htmlFor="email">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input 
                                        value={password}
                                        onChange={(event)=>{setPassword(event.target.value)}}
                                        type="password" 
                                        className="form-control" 
                                        id="password" 
                                        placeholder="Password" />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input 
                                        value={confirm_password}
                                        onChange={(event)=>{setPasswordConfirmation(event.target.value)}}
                                        type="password" 
                                        className="form-control" 
                                        id="confirm_password" 
                                        name='confirm_password'
                                        placeholder="confirm_password " />
                                        <label htmlFor="confirm_password">Password Confirmation</label>
                                    </div>

                                    <div className="d-grid">
                                        <button 
                                        disabled={isSaving}
                                        onClick={handleSave} 
                                        className="btn btn-primary btn-login text-uppercase fw-bold" 
                                        type="button">
                                            Sign Up
                                        </button>
                                    </div>
                                    <hr className="my-4"></hr>

                                    <div className="d-grid">
                                        <Link className="btn btn-outline-primary btn-login text-uppercase fw-bold" to="/">Log in</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Registration;