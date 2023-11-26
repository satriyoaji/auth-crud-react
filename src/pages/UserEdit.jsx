import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import InstanceAxios from '../components/axios'

function UserEdit() {
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState('')
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate()
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }

        InstanceAxios.get(`/users/${id}`, config)
            .then(function (response) {
                let user = response.data?.data
                setName(user.name);
                setEmail(user.email);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }, [])


    const handleSave = () => {
        setIsSaving(true);
        InstanceAxios.put(`/users/${id}`, {
            name: name,
            email: email
        }, config)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'User updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setName('')
                setErrorName('')
                setEmail('')
                setErrorEmail('')
                navigate('/')
            })
            .catch(function (error) {
                setErrorName('')
                setErrorEmail('')
                if (error.response?.data?.message) {
                    let errorObject = error.response?.data?.message
                    Object.keys(errorObject).forEach(key => {
                        if(key === 'name') {
                            setErrorName(errorObject[key])
                        } else if(key === 'email') {
                            setErrorEmail(errorObject[key])
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
                <h2 className="text-center mt-5 mb-3">Edit User</h2>
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
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-success mt-3">
                                Update User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserEdit;