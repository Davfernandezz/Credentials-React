import React, { useState } from 'react'

export const Login = () => {
    const [credentials, setCredentials] = useState(
        {
          email: "",
          password: ""
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
    
      function login() {
        console.log('Login')
        console.log(credentials)
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
            {/* <label htmlFor="email">Email: </label> */}
            <input type="email" name="email" placeholder='Email' onChange={handleChange} />
          </div>
          <div>
            {/* <label htmlFor="password">Password: </label> */}
            <input type="password" name="password" placeholder='Password' onChange={handleChange} />
          </div>
          <div>
            <input type="button" value="Login" onClick={login} />
          </div>
        </>
      )
}
