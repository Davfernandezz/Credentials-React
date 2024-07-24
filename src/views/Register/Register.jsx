import React, { useState } from 'react'
import { registerUser } from '../../services/apiCalls'
import { useNavigate } from 'react-router-dom'
import { CInput } from '../../components/CInput/CInput'

export const Register = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState(
        {
            email: "",
            password_hash: ""
        }
    )

    function handleChange(e) {
        console.log('Handle Change')
        setCredentials((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    async function register() {
        try {
            console.log(credentials);
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
        <>
            <h1>Register</h1>
            <div>
                <CInput type="text" name="email" id="" placeholder='Email' onChange={handleChange} />
            </div><div>
                <CInput type="password" name="password_hash" id="" placeholder='Password' onChange={handleChange} />
            </div><div>
                <input type="button" value="Register" onClick={register} />
            </div>
        </>
    )
}
