
import { useState } from "react";
import "../style/Auth.scss";
import Inputs from "../components/Inputs";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate=useNavigate()
    const {handleRegister,loading}=useAuth()
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
   async function FormSubmit(e) {
        e.preventDefault()
       await handleRegister(username,email,password)
       navigate('/login')
    }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="subtitle">
          Register to get started with us
        </p>

        <form onSubmit={FormSubmit}>
         <Inputs value={username} onChange={(e)=>{
            setusername(e.target.value)
         }}  label={'Username'} placeholder={'Enter Your Username'}/>
          <Inputs value={email} onChange={(e)=>{
            setemail(e.target.value)
          }}  label={'Email'} placeholder={'Enter Your Email'}/>
           <Inputs value={password} onChange={(e)=>{
            setpassword(e.target.value)
           }}  label={'Password'} placeholder={'Enter Your Password'}/>

          

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
