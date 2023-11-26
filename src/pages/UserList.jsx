import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import InstanceAxios from '../components/axios'

function UserList() {
    const navigate = useNavigate()
    const [userList, setUserList] = useState([])
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/login");
        }
        fetchUserList()
    }, [])

    const fetchUserList = () => {
        InstanceAxios.get('/users', config)
            .then(function (response) {
                setUserList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                InstanceAxios.delete(`/users/${id}`, config)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'User deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchUserList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    const Logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">User Manager</h2>
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-outline-primary" to="/create">Create New User </Link>
                        <button onClick={() => Logout()} className="btn btn-outline-danger float-end"> Logout </button>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((user, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <Link
                                                    to={`/show/${user.id}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Show
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${user.id}`}>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserList;