import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { v4 as uuid } from "uuid"
import Cookies from 'universal-cookie';

const useRegister = () => {
    const cookies = new Cookies();
    const [loading, setLoading] = useState(false);
    const [photoimage, setPhotoimage] = useState(null);
    const register = async (username, email, phoneNumber, password, imagePreview) => {
        e.preventDefault();
        setLoading(true)
        const success = handleInputErrors(username, email, phoneNumber, password, imagePreview);
        if (!success) return;
        const uid = uuid()
        const base64Data = imagePreview;
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/upload-image`, { image: base64Data, uid: uid })
            .then((res) => {
                // console.log(res);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/get-image`, { uid: uid })
            .then((res) => {
                // console.log(res)
                setPhotoimage(res.data.data.image)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
        // await axios.post('http://localhost:5000/${process.env.BASE_API_URL_HOST}/auth/register', { username, email, phoneNumber, password })
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/register`, { username, email, phoneNumber, password, photoimage })
            // .then(res => console.log(res.data))
            .then((res) => {
                console.log(res.data);
                if (res.data.status == "ok") {
                    toast.success("Registration Successful");
                    setLoading(false)
                    // cookies.set("TOKEN", res.data.data, {
                    //     path: "/",
                    // });
                    // window.localStorage.setItem("token", res.data.data);
                    // window.localStorage.setItem("loggedIn", true);
                    // window.location.href = "/";
                    // navigate('/login')
                    window.location.href = "./login";
                }
                else {
                    toast.error(res.data.status);
                    setLoading(false)
                    // window.location.href = "./login";
                }
            })
            .catch((err) => {
                toast.error(err.message);
                setLoading(false)
            })


    }
    return { loading, register }
}

export default useRegister

function handleInputErrors(username, email, phoneNumber, password, imagePreview) {
    if (!username || !email || !phoneNumber || !password || !imagePreview) {
        toast.error("Please fill in all fields");
        setLoading(false)
        return false;
    }

    return true;
}