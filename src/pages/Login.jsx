import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import InstanceAxios from '../components/axios';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('admin');
    const [password, setPassword] = useState('11')
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (
            (localStorage.getItem('user') && localStorage.getItem('user') != null) ||
            (localStorage.getItem('token') && localStorage.getItem('token') != null)
        ) {
            navigate("/");
        }
    }, [])

    const handleSave = () => {
        /* kminchelle */
        /* 0lelplR */
        setIsSaving(true);
        var em = email === 'admin' ? 'kminchelle' : email;
        var pas = password === '11' ? '0lelplR' : password;

        InstanceAxios.post('/auth/login', {
            username: em,
            password: pas
        })
            .then(function (response) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Login successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/");
                setIsSaving(false);
                setEmail('')
                setPassword('')
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
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                <form>
                                    <div className="form-floating mb-3">
                                        <input
                                            value={email}
                                            onChange={(event) => { setEmail(event.target.value) }}
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="name@example.com"
                                        />
                                        <label htmlFor="email">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            value={password}
                                            onChange={(event) => { setPassword(event.target.value) }}
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>

                                    <div className="d-grid">
                                        <button
                                            disabled={isSaving}
                                            onClick={handleSave}
                                            type="submit"
                                            className="btn btn-primary btn-login text-uppercase fw-bold" >
                                            Sign in
                                        </button>
                                    </div>
                                    <hr className="my-4"></hr>

                                    <div className="d-grid">
                                        <Link className="btn btn-outline-primary btn-login text-uppercase fw-bold" to="/signup">Create new account </Link>
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

export default Login;