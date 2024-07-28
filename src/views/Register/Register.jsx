import React, { useState } from 'react'
import { registerUser } from '../../services/apiCalls'
import { useNavigate } from 'react-router-dom'
import { CInput } from '../../components/CInput/CInput'
import './Register.css';

export const Register = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState(
        {
            email: "",
            password_hash: ""
        }
    )

    function handleChange(e) {
        setCredentials((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    async function register() {
        try {
            const response = await registerUser(credentials)

            if (response.success) {
                navigate('/login')
            } else {
                alert(response.message)
            }
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card my-5">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Register</h1>
                            <form>
                                <CInput
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    emitFunction={handleChange}
                                />
                                <CInput
                                    type="password"
                                    name="password_hash"
                                    placeholder="Password"
                                    emitFunction={handleChange}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={register}
                                >
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};