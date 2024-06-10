import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import Sidebar from './chatitems/sidebar/Sidebar';
import MainContent from './chatitems/maincontent/MainContent';
import { useNavigate } from 'react-router-dom';
// import { collection, getDocs, query, where } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext'
import { useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Chat = () => {
    // const currentUser = useSelector(authuser);
    const { currentUser } = useContext(AuthContext)
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activetype, setActivetype] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    // console.log('currentUser', currentUser);
    // console.log(users);
    useEffect(() => {
        const getusers = async () => {
            if (currentUser?.email === 'admin@gmail.com') {
                await axios.get(`${process.env.BASE_API_URL_HOST}/auth/getAllUsers-no-admin`)
                    .then(res => {
                        setUsers(res.data.data)
                        setLoading(false)
                    })
                    .catch(err => console.log(err))
            }
            else {
                await axios.get(`${process.env.BASE_API_URL_HOST}/auth/getAdmin`)
                    .then(res => {
                        setUsers(res.data.data)
                        setLoading(false)
                    })
                    .catch(err => console.log(err))
            }


        }
        getusers();
    }, [])
    let admin
    // useEffect(() => {
    users.map(ele => admin = ele)
    // }, [])

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    }, [currentUser])
    const handelUserClick = (user) => {
        setSelectedUser(user)
    }
    return (
        <>
            {/* <div className="flex min-h-screen bg-slate-100 max-w-[1435px] min-w-[850px] mx-auto"> */}
            <div className='flex min-h-screen text-center bg-slate-100 max-w-[1435px] mx-auto'>
                {currentUser?.email === "admin@gmail.com" ?
                    <>
                        {
                            !selectedUser &&
                            <div className='bg-white lg:w-[400px] w-[300px] '>
                                <Sidebar
                                    users={users}
                                    onUserClick={handelUserClick}
                                    selectedUser={selectedUser}
                                />
                            </div>
                        }
                        <div className='bg-slate-300 flex-1'>
                            <MainContent selectedUser={selectedUser}
                                setSelectedUser={setSelectedUser}
                                activetype={activetype}
                                setActivetype={setActivetype}
                            />

                        </div>
                    </>
                    :
                    <div className='bg-slate-300 flex-1'>
                        <MainContent selectedUser={admin}
                            activetype={activetype}
                            setActivetype={setActivetype}
                        />
                    </div>
                }
            </div >
        </>
    )
}

export default Chat