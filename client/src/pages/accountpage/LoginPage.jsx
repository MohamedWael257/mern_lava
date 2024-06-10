import React, { useContext } from 'react'
import Login from '../../components/auth/Login'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AccountPage = () => {
    // const navigate = useNavigate()
    const { currentUser, loading } = useContext(AuthContext);
    // const ProtectedRoute = ({ children }) => {
    //     if (!currentUser) {
    //         return children;
    //     }
    //     else if (currentUser?.email) {
    //         return < Navigate to='/' />
    //     }
    // };
    return (
        // <ProtectedRoute>
        <Login />
        // </ProtectedRoute>
    )
}

export default AccountPage