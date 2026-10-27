
import { createContext, useState } from "react";

export const AuthContext=createContext()
export function AuthProvider({children}) {
    const [loading, setloading] = useState(false)
    const [user, setuser] = useState([])

    return(
       <AuthContext.Provider value={{setloading,loading,setuser,user}}>
        {children}
       </AuthContext.Provider>
    )
}