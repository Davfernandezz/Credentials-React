import React, { useEffect, useState } from 'react'
import { deleteUserById, getUsers } from '../../services/apiCalls'
import './Admin.css';
import { CInput } from '../../components/CInput/CInput';

export const Admin = () => {
    const [users, setUsers] = useState([])

    const passport = JSON.parse(localStorage.getItem("passport"))
    const token = passport.token

    useEffect(() => {
        const bringAllUsers = async () => {
            const allUsers = await getUsers(token)
            console.log(allUsers)
            if (allUsers.success){
                setUsers(allUsers.data)
            }
        };
        bringAllUsers()
    }, []);

    const deleteUserHandler = async (e) => {
        const id = e.target.name
        const res = await deleteUserById(token, id)
        
      }
    return (
        <>
            <h1>Admin</h1>
            <div className="users-container">
                <div className="table-row">
                    <div className="content">id</div>
                    <div className="content">email</div>
                    <div className="content">creation date</div>
                    <div className="content">actions</div>
                </div>
                {users.length && users.map((user) => {
                    return (
                        <div className="table-row" key={user.id}>
                            <div className="content">{user.id}</div>
                            <div className="content">{user.email}</div>
                            <div className="content">{user.created_at}</div>
                            <div className="content"><input type="button" name={user.id} value="🛇" onClick={deleteUserHandler}/></div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};
