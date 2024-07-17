import './App.css'

function App() {
  return (
    <>
      <h1>Login</h1>
      <div>
        {/* <label htmlFor="email">Email: </label> */}
        <input type="text" name="email" id="" placeholder='Email'/>
      </div>
      <div>
        {/* <label htmlFor="password">Password: </label> */}
        <input type="password" name="" id="" placeholder='Password'/>
      </div>
      <div>
        <input type="button" value="Login" />
      </div>
    </>
  )
}

export default App
