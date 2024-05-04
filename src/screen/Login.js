import React, { useState } from 'react'
import Swal from 'sweetalert2'
const Login = (props) => {
  const { saveUser } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async () => {
    try {
      const body ={
        email: email,
        password: password
      }
      const response = await fetch('http://localhost:2610/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      const result = await response.json()
      debugger;
      if (result.status) {
        // luu vao storage
      saveUser(result.data)
      }else{
        Swal.fire({
          icon: 'error',
          title: "....Opps",
          text:"Dang nhap that bai"
        })
      }
      
    } catch (error) {
      console.log( "...Loi", error);
      Swal.fire({
        icon: 'error',
        title: "....Opps",
        text:"Dang nhap that bai"
      })
    }
  }
  return (
    <form>
      <div className="mb-3 mt-3">
        <label htmlFor='email' className="form-label">Email:</label>
        <input value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          className="form-control"
          placeholder='Enter Email' />
      </div>
      <div className="mb-3">
        <label htmlFor='password' className="form-label">Password:</label>
        <input value={password}
          onChange={(e)=> setPassword(e.target.value)}
          type='password'
          className="form-control"
          placeholder='Enter Password' />
      </div>
      <button onClick={handleLogin} type='button' className='btn btn-primary'>Login</button>
    </form>
  )
}

export default Login

