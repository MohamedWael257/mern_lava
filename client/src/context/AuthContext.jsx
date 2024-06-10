import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { removeActiveUserHandler, setActiveUserHandler } from "../redux/slice/authslice";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const cookies = new Cookies();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = cookies.get("TOKEN");
    const dispatch = useDispatch()
    useEffect(() => {
        if (token) {
            axios.post(`${process.env.BASE_API_URL_HOST}/auth/userData`, { token })
                .then((res) => {
                    if (res.data.data == "token expired") {
                        setCurrentUser(null)
                        dispatch(removeActiveUserHandler())
                        setLoading(false)
                    }
                    else {
                        setCurrentUser(res.data.data);
                        dispatch(setActiveUserHandler(res.data.data))
                        setLoading(false)
                    }
                });
        }
        else {
            dispatch(removeActiveUserHandler())
            setCurrentUser(null)
            setLoading(false)
        }
    }, [token]);
    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};