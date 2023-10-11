import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouter({ children }) {
    const logged = useSelector(state => state.account.logged)

    if (!logged) {
        return <Navigate to={'/login'} />
    } else {
        return children
    }
}
