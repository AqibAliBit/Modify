import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { Login, Register } from "../services/auth.api";


export function useAuth() {
    const context=useContext(AuthContext)
    const {setloading,loading,user,setuser}=context
   async function handleRegister(username,email,password) {
        setloading(true)
        try{
            const response=await Register(username,email,password)
            setuser(response.user)
            console.log(response);
           return response
        }
        catch(err){
            console.log(err);
            
        }
        setloading(false)
    }
   async function handleLogin(username,password) {
        setloading(true)
        try{
            const response=await Login(username,password)
            setuser(response.user)
            console.log(response);
           return response
        }
        catch(err){
            console.log(err);
            
        }
        setloading(false)
    }    
    return{
        handleRegister,loading,user,handleLogin
    }
}
