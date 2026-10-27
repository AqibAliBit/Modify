
import { useState } from "react";
import Inputs from "../components/Inputs";
import { useAuth } from "../hooks/useAuth";
import "../style/Auth.scss";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate=useNavigate()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const {handleLogin}=useAuth()
    async function FormSubmit(e) {
        e.preventDefault()
       try {
    await Login(username, password)
    navigate('/')
} catch (err) {
    console.log(err)
}
    }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">
          Login to continue to your account
        </p>

        <form onSubmit={FormSubmit}>
         <Inputs value={username} onChange={(e)=>{
            setusername(e.target.value)
         }} label={'Username'} placeholder={'Enter Your Username'}/>
          <Inputs value={password} onChange={(e)=>{
            setpassword(e.target.value)
         }} label={'Password'} placeholder={'Enter Your Password'}/>
         

          

          <div className="forgot-password">
            <a href="#forgot">Forgot password?</a>
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
