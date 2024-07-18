import React, { useState } from 'react'

export const Register = () => {

    const [credentials, setCredentials] = useState(
        {
            email: "",
            password: ""
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

    function register() {
        console.log(credentials);
    }

    return (
        <>
            <h1>Register</h1>
            <input type="text" name="email" id="" placeholder='Email' onChange={handleChange}/>
            <input type="password" name="password" id="" placeholder='Password' onChange={handleChange}/>
            <input type="button" value="Register" onClick={register}/>
        </>
    )
}
