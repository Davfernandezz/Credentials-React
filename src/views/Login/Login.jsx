import React, { useState } from 'react'
import { CInput } from '../../components/CInput/CInput';
import { loginUser } from '../../services/apiCalls';
import { jwtDecode } from 'jwt-decode';

export const Login = () => {
    const [credentials, setCredentials] = useState(
        {
            email: "",
            password_hash: ""
        }
    )

    function handleChange(e) {
        console.log('handleChange');
        setCredentials(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    async function login() {
        console.log("login");
        console.log(credentials);
        try {
          const response = await loginUser(credentials);
          if (response.success) {
            const decodedToken = jwtDecode(response.token)
            const passport = {
                token: response.token,
                tokenData: decodedToken
            }
            localStorage.setItem("passport",JSON.stringify(passport));
          } else {
            console.log(response);
          }
        } catch (error) {
          console.log(error);
        }
      }

    //OPCION 1
    // 
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    // function handleChange(e) {
    //   console.log('handleChange')

    //   if (e.target.name === 'email') {
    //     setEmail(e.target.value)
    //   }

    //   if (e.target.name === 'password') {
    //     setPassword(e.target.value)
    //   }
    // }

    // function login() {
    //   console.log('Login')
    //   if(email.length === 0 || password.length === 0){
    //     return alert('Email and password are required')
    //   }
    //   console.log(email)
    //   console.log(password)
    // }

    return (
        <>
            <h1>Login</h1>
            <div>
                <CInput type="email"
                    name="email"
                    placeholder="Email"
                    emitFunction={handleChange}
                />
            </div>
            <div><CInput
                type="password"
                name="password_hash"
                placeholder="Password"
                emitFunction={handleChange}
            /></div>
            <div>
                <input type="button" value="Login" onClick={login} />
            </div>
        </>
    )
}
