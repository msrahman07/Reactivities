import React from 'react'
import { Navigate } from 'react-router-dom';
import { useStore } from '../stores/store';


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const {userStore: {isLoggedIn}} = useStore();
    if(!isLoggedIn) {
        return <Navigate to='/' />
    }
    return (
        children
    )
}

export default PrivateRoute