import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import InstanceAxios from '../components/axios'


function ProjecCreate() {
    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState('')
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }
    }, [])

    const handleSave = () => {
        setIsSaving(true);
        InstanceAxios.post('/users', {
            name: name,
            email: email,
            password: password,
        }, config)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'User saved successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setName('')
                setErrorName('')
                setEmail('')
                setErrorEmail('')
                setPassword('')
                setErrorPassword('')
                navigate('/')
            })
            .catch(function (error) {
                setErrorName('')
                setErrorEmail('')
                setErrorPassword('')
                if (error.response?.data?.message) {
                    let errorObject = error.response?.data?.message
                    Object.keys(errorObject).forEach(key => {
                        if(key === 'name') {
                            setErrorName(errorObject[key])
                        } else if(key === 'email') {
                            setErrorEmail(errorObject[key])
                        } else if(key === 'password') {
                            setErrorPassword(errorObject[key])
                        }
                    });
                }
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 2000
                })
                setIsSaving(false)
            });
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New User</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/">View All Users
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    onChange={(event) => { setName(event.target.value) }}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name" />
                                <p className={'text-danger'}>{errorName}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    value={email}
                                    onChange={(event) => { setEmail(event.target.value) }}
                                    className="form-control"
                                    id="email"
                                    name="email"/>
                                <p className={'text-danger'}>{errorEmail}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    onChange={(event) => {setPassword(event.target.value)}}
                                    value={password}
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="name" />
                                <p className={'text-danger'}>{errorPassword}</p>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Save User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjecCreate;