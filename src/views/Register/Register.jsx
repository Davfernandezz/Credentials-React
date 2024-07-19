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

    async function register() {
		try {
			console.log(credentials);

			// consumir la api
			const request = await fetch("http://localhost:4000/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			});

			const result = await request.json();

			console.log(result);

			// su api devuelve ok redirigo a una pagina Dashboard

			// Si la api devuelve false mostramos mensaje de error
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
            <input type="password" name="password" id="" placeholder='Password' onChange={handleChange}/>
            </div><div>
            <input type="button" value="Register" onClick={register}/>
            </div>
        </>
    )
}
