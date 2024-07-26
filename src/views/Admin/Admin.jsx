import React, { useEffect, useState } from 'react';
import { deleteUserById, getUsers } from '../../services/apiCalls';
import './Admin.css';

export const Admin = () => {
    const [users, setUsers] = useState([]);

    const passport = JSON.parse(localStorage.getItem('passport'));
    const token = passport.token;

    useEffect(() => {
        const bringAllUsers = async () => {
            const allUsers = await getUsers(token);
            console.log(allUsers);
            if (allUsers.success) {
                setUsers(allUsers.data);
            }
        };
        bringAllUsers();
    }, []);

    const deleteUserHandler = async (e) => {
        const id = +e.target.name;
        const res = await deleteUserById(token, id);
        if (res.success) {
            const remainingUsers = users.filter((user) => user.id !== id);
            console.log(remainingUsers);
            setUsers(remainingUsers);
        }
    };

    return (
        <div className="admin-container container mt-4">
            <div className="card">
                <h1 className="text-center mt-3 mb-3">Admin Dashboard</h1>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Creation Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name || 'Not available'}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <button type="button" name={user.id} className="btn btn-danger btn-sm" onClick={deleteUserHandler}>Delete</button>
                                    </td>
                                </tr>
                            )))
                            : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};