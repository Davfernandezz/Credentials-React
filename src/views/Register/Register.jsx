import React, { useState } from 'react'
import { registerUser } from '../../services/apiCalls'

export const Register = () => {
    const [credentials, setCredentials] = useState(
        {
            email: "",
            password_hash: ""
        }
    )

    function handleChange(e){
        console.log('Handle Change')
        setCredentials( (prevState)=>(
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
            console.log(response)
		} catch (error) {
			console.log(error);
		}
	}

    return (
        <>
            <h1>Register</h1>
            <div>
            <input type="text" name="email" id="" placeholder='Email' onChange={handleChange}/>
            </div><div>
            <input type="password" name="password_hash" id="" placeholder='Password' onChange={handleChange}/>
            </div><div>
            <input type="button" value="Register" onClick={register}/>
            </div>
        </>
    )
}
