import React, { Fragment, useContext, useEffect, useState } from 'react'
import './Security.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoPencil } from "react-icons/go";
import { AuthContext } from '../../context/AuthContext'
import Loader from '../loader/Loader'
import axios from 'axios';
import Cookies from 'universal-cookie';

const Security = () => {
    const cookies = new Cookies();
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [gender, setGender] = useState("")
    const [activeedit, setActiveedit] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const [currentuser, setCurrentuser] = useState([])
    const [loading, setLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState(currentUser?.photoimage);

    useEffect(() => {
        setFullname(currentUser?.fullname)
        setUsername(currentUser?.username)
        setEmail(currentUser?.email)
        setAddress(currentUser?.address)
        setPhoneNumber(currentUser?.phoneNumber)
        // setImagePreview(currentUser?.photoimage)
        setGender(currentUser?.gender)
    }, [currentUser])
    const onresethandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const id = currentUser?._id;
        const token = cookies.get('TOKEN')
        await axios.get(`${process.env.BASE_API_URL_HOST}/auth/reset-password/${id}/${token}`)
            .then((res) => {
                // toast.success("check your Email inbox")
                toast.success(res.data.status)
                setLoading(false)
            })
            .catch((error) => {
                toast.error(error.message)
                setLoading(false)
            })


    }
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };
    const update_user_data = async (e) => {
        e.preventDefault();
        const uid = currentUser?._id
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/update-user-data`, { uid, email, username, phoneNumber, address, fullname, gender })
            .then((res) => {
                // toast.success("check your Email inbox")
                toast.success(res.data.status)
                setLoading(false)
                setActiveedit(false)
            })
            .catch((error) => {
                toast.error(error.message)
                setLoading(false)
                setActiveedit(false)
            })
        // }

    }
    return (
        <>
            {loading ? <Loader />
                : <div className='security'>
                    <div className='data-profile' key={currentuser?.id}>
                        <GoPencil className='icon' size={30} onClick={() => setActiveedit(!activeedit)} color='#1f93ff' />
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='fullname'>Full Name </label>
                            <p> : </p>
                            <input type="text" id='fullname' placeholder={`${activeedit ? 'Enter your Full Name' : ''}`} disabled={activeedit ? false : true} value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='username'>Username </label>
                            <p> : </p>
                            <input type="text" id='username' placeholder={`${activeedit ? 'Enter your Username' : ''}`} disabled={activeedit ? false : true} value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='email'>Email </label>
                            <p> : </p>
                            <input type="email" id='email' placeholder={`${activeedit ? 'Enter your Email' : ''}`} disabled={activeedit ? false : true} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='address'>Address </label>
                            <p> : </p>
                            <input type="text" id='address' placeholder={`${activeedit ? 'Enter your Address' : ''}`} disabled={activeedit ? false : true} value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='phoneNumber'>Phone Number </label>
                            <p> : </p>
                            <input type="tel" id='phoneNumber' placeholder={`${activeedit ? 'Enter your Phone Number' : ''}`} disabled={activeedit ? false : true} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='gender'>Gender </label>
                            <p> : </p>
                            <input type="text" id='gender' placeholder={`${activeedit ? 'Enter your Gender' : ''}`} disabled={activeedit ? false : true} value={gender} onChange={(e) => setGender(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            {activeedit ?
                                <label className='cursor-pointer' htmlFor='photoimage'>Choose your photoimage </label>
                                :
                                <label>photoimage </label>
                            }
                            <p> : </p>
                            {/* <label htmlFor='photoimage'>Select Your Profile Image </label> */}
                            {imagePreview &&
                                <img style={{ border: "3px solid black" }}
                                    className="w-16 h-16 rounded-full"
                                    src={imagePreview}
                                />
                            }
                            <input
                                type="file"
                                id="photoimage"
                                // disabled={activeedit ? false : true}
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />

                            {
                                loading && <p>loading</p>
                            }
                        </div>
                        {
                            activeedit &&
                            <div className='edit'>
                                <button className='save' onClick={update_user_data}>save</button>
                                {currentUser?.provider && currentUser?.provider === "Email" &&
                                    <button className='reset-pass' onClick={onresethandler}>reset pass</button>
                                }
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Security