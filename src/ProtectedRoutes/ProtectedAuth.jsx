import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedAuth({ children }) {
    if (!localStorage.getItem("userToken")) {
        return children
    } else {
        return <Navigate to="/"></Navigate>
    }
}

export default ProtectedAuth
