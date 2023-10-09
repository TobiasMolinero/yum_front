/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from "react-router-dom"
import { useState } from "react"

export const ProtectedRoute = ({children}) => {

    const [authenticate, setAuthenticate] = useState(JSON.parse(localStorage.getItem('auth')))
    
    if(authenticate !== true){
       return <Navigate to='/login' /> 
    }

    return <Outlet />
}