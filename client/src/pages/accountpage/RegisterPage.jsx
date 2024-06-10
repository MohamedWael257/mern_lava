import React, { useContext } from 'react'
import Register from '../../components/auth/Register'
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const SignupPage = () => {
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
        <Register />
        // </ProtectedRoute>

    )
}

export default SignupPage