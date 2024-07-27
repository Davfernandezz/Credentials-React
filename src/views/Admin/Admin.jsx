import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserById, getUsers } from '../../services/apiCalls';
import './Admin.css';

export const Admin = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem('passport'));
    const token = passport ? passport.token : null;

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        const bringAllUsers = async () => {
            const allUsers = await getUsers(token);
            if (allUsers.success) {
                setUsers(allUsers.data);
            } else {
                navigate('/login');
            }
        };
        bringAllUsers();
    }, [navigate, token]);

    const deleteUserHandler = async (e) => {
        if (!token) {
            alert('No estás autorizado para realizar esta acción.');
            navigate('/login');
            return;
        }
        const id = +e.target.name;
        const res = await deleteUserById(token, id);
        if (res.success) {
            const remainingUsers = users.filter((user) => user.id !== id);
            setUsers(remainingUsers);
        } else {
            alert('Error al eliminar el usuario. Verifica tu sesión.');
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
                            <th className="text-center">ID</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Creation Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name || 'Not available'}</td>
                                    <td>{user.email}</td>
                                    <td>{formatDate(user.created_at)}</td>
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