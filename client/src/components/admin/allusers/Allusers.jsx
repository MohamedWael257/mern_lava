import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import './Allusers.css'
import { FaUserCircle } from 'react-icons/fa';
const Allusers = () => {
    const { currentUser } = useContext(AuthContext)
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getusers = async () => {
            if (currentUser?.email === 'admin@gmail.com') {
                await axios.get(`${process.env.BASE_API_URL_HOST}/auth/getAllUsers-no-admin`)
                    .then(res => {
                        setUsers(res.data.data)
                    })
                    .catch(err => console.log(err))
            }
        }
        getusers();
    }, [])
    return (
        <>
            <h2 className='text-4xl text-center my-8 font-semibold text-[#263787]'>All Users</h2>
            <section className="users">
                {
                    users.map((user, index) => {
                        return (
                            <div className="user" key={index}>
                                {
                                    user.photoimage ?
                                        <img className='photoimage' src={user.photoimage} alt="" />
                                        :
                                        <FaUserCircle className=' photoimage' color="#263787" />

                                }
                                <p className='username'>{user.username}</p>
                                <p className='phone'>{user.phone}</p>
                                <p className='email'>{user.email}</p>
                            </div>
                        )
                    })
                }
            </section>
        </>
    )
}

export default Allusers