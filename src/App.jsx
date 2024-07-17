import { useState } from 'react'
import './App.css'

function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleChange(e) {
    console.log('handleChange')

    if (e.target.name === 'email') {
      setEmail(e.target.value)
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value)
    }

    console.log(email)
    console.log(password)
  }

  return (
    <>
      <h1>Login</h1>
      <div>
        {/* <label htmlFor="email">Email: </label> */}
        <input type="text" name="email" placeholder='Email' onChange={handleChange} />
      </div>
      <div>
        {/* <label htmlFor="password">Password: </label> */}
        <input type="password" name="password" placeholder='Password' onChange={handleChange} />
      </div>
      <div>
        <input type="button" value="Login" />
      </div>
    </>
  )
}

export default App
