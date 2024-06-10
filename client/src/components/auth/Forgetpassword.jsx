import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import HeroCard from '../ui/herocard/HeroCard'
import Logo from "../../assets/img/logo/03.png"

const Forgetpassword = () => {
    const [email, setEmail] = useState(null)
    const Forgetpassword = async () => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/forgot-password`, { email })
            .then((res) => {
                toast.success(res.data.message)
                console.log(res.data)
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }
    return (
        <>
            <HeroCard page={"Forget password"} />
            <div className='body'>
                <div className="wrapper">
                    <div className="form-box otp">
                        <img className='w-[200px] mx-auto my-4' src={Logo} alt="" />
                        <h2 className='mb-6 text-center'>Forgetpassword</h2>
                        <form >
                            <div className="input-box">
                                <span className="erroremail error text-danger"></span>
                                <span className="icon">
                                    <ion-icon name="mail"></ion-icon>
                                </span>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <label>Email</label>
                            </div>


                            <button className='btn' onClick={Forgetpassword}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgetpassword