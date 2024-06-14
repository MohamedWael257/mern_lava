import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const useLogin = () => {
    const cookies = new Cookies();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const login = async (email, password) => {
        setLoading(true)
        const success = handleInputErrors(email, password);
        if (!success) return;
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/login`, { email, password })
            .then(res => {
                if (res.data.status == "Success") {
                    toast.success("Signin successfully");
                    cookies.set("TOKEN", res.data.data, {
                        path: "/",
                        // maxAge: 15 * 24 * 60 * 1000,
                        // httpOnly: true,
                        // sameSite: "strict",
                        // secure: 'production' !== 'developmnent'
                    });
                    window.location.href = "/";
                    setLoading(false)
                }
                else {
                    toast.error("error")
                    setLoading(false)

                }
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)


            })

    }
    return { loading, login };

}

export default useLogin

function handleInputErrors(email, password) {
    if (!email || !password) {
        toast.error("Please fill in all fields");
        setLoading(false)
        return false;
    }

    return true;
}