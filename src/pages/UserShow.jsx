import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout"
import InstanceAxios from '../components/axios';


function UserShow() {
    const navigate = useNavigate()
    const [id, setId] = useState(useParams().id)
    const [user, setUser] = useState({ name: '', email: '' })
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }

        InstanceAxios.get(`/users/${id}`, config)
            .then(function (response) {
                setUser(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show User</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/"> View All Users
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Name:</b>
                        <p>{user.name}</p>
                        <b className="text-muted">Email:</b>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserShow;