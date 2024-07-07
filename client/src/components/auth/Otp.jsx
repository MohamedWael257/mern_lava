import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import HeroCard from '../ui/herocard/HeroCard'
import { useParams } from 'react-router-dom';
import Logo from "../../assets/img/logo/03.png"
import { AuthContext } from '../../context/AuthContext';

const Otp = () => {
    const { currentUser } = useContext(AuthContext)
    const { email } = useParams();
    const [keyvalue, setKeyvalue] = useState('')
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const token = params.get('token');
    const confirm = async (e) => {
        e.preventDefault()
        if (keyvalue === key) {
            await axios.get(`${process.env.BASE_API_URL_HOST}/auth/verify/${token}`)
                .then(res => toast.success(res.data))
                .catch(err => toast.error(err.message))
        }
        else {
            toast.error('error key')
        }
    }
    return (
        <>
            {currentUser &&
                <HeroCard page={'OTP Vertification'} />
            }
            <div className="body">
                <div className="wrapper">
                    <form className="form-box otp">
                        <img className='w-[200px] mx-auto my-4' src={Logo} alt="" />
                        <h2 className='mb-6 text-center'>Create your carwash account</h2>
                        <p id="otpmessage">We've sent vertification code to your email : {email} </p>
                        <br /><br />
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="lock-closed"></ion-icon>
                            </span>
                            <input type="text" name="code" id="code" maxLength={6} value={keyvalue} onChange={(e) => setKeyvalue(e.target.value)} required />
                            <label>Verification Code</label>
                        </div>
                        <button className="btn" onClick={confirm}>Submit</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Otp