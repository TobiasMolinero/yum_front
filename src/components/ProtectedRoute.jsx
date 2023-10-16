/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from "react-router-dom"
import { useState } from "react"
import Inicio from "../pages/Inicio"

export const ProtectedRoute = () => {

    const [authenticate, setAuthenticate] = useState(JSON.parse(localStorage.getItem('auth')))
    
    if(authenticate !== true){
        return <Navigate to='/login' /> 
    }

    if(window.location.pathname === '/app'){
        window.location.pathname = '/app/inicio'
        return <Inicio />
    }

    return <Outlet />
}