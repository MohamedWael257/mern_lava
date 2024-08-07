import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import HeroCard from '../ui/herocard/HeroCard'
import Logo from "../../assets/img/logo/03.png"
import { AuthContext } from '../../context/AuthContext'

const Resetpassword = () => {
    const { currentUser } = useContext(AuthContext)
    const { id, token } = useParams()
    const [password, setPassword] = useState('')
    const [confpassword, setConfpassword] = useState('')
    const [data, setData] = useState('')
    const navigate = useNavigate()
    const Resetpassword = async (e) => {
        e.preventDefault()
        if (password === confpassword) {
            await axios.post(`${process.env.BASE_API_URL_HOST}/auth/reset-password/${id}/${token}`, { password })
                .then((res) => {
                    toast.success(res.data.status)
                    navigate('/')
                })
                .catch((error) => {
                    console.log(error);
                    // toast.error(error.message)
                })
        }
        else {
            toast.error('password not matched')
        }
    }
    return (
        <>
            {currentUser &&
                <HeroCard page={'Reset Password'} />
            }
            <div className="body">
                <div className="wrapper">
                    <form className="form-box">
                        <img className='w-[200px] mx-auto my-4' src={Logo} alt="" />
                        <h2 className='mb-6 text-center'>Reset Your Password</h2>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="lock-closed"></ion-icon>
                            </span>
                            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <label>Password</label>
                        </div>                                <div className="input-box">
                            <span className="icon">
                                <ion-icon name="lock-closed"></ion-icon>
                            </span>
                            <input type="password" name="confpassword" id="confpassword" value={confpassword} onChange={(e) => setConfpassword(e.target.value)} required />
                            <label>Confirm Password</label>
                        </div>
                        <button className='btn' onClick={Resetpassword}>confirm</button>
                    </form>
                </div>
            </div>


        </>
    )
}

export default Resetpassword