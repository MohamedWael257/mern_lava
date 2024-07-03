import React, { useContext, useEffect, useState } from 'react'
import './Notification.css'
import { AuthContext } from '../../context/AuthContext'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PiHeartBreakFill } from 'react-icons/pi'

const Notification = () => {
    const [notification, setNotification] = useState([])
    const { currentUser } = useContext(AuthContext)
    const dispatch = useDispatch()
    useEffect(() => {
        const getnotifications = async () => {
            await axios.get(`${process.env.BASE_API_URL_HOST}/notification/notificationData/${currentUser?._id}`)
                .then(res => {
                    setNotification(res.data)
                })
                .catch(err => console.log(err))
        }
        getnotifications();
    }, [notification])


    const sortedNotification = [...notification].sort((a, b) => {
        return a.date.localeCompare(b.date);
    });
    const deleteNotification = async (notificationId) => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/notification/clear-notification`, { notificationId })
            .then(
                res => {
                    toast.success(res.data)
                    // dispatch(getNotification())
                })
            .catch(err => {
                toast.error(err.data)
            })
    };
    const formatRelativeTime = (timestamp) => {
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        if (timestamp < minute) {
            return "now";
        }
        else if (timestamp < hour) {
            const minutes = Math.floor(timestamp / minute);
            return `${minutes}m`;
        } else if (timestamp < day) {
            const hours = Math.floor(timestamp / hour);
            return `${hours}h`;
        }
        else if (timestamp >= day) {
            sortedNotification.map((notification) => {
                if ((Date.now() - notification.date) >= day) {
                    deleteNotification(notification.uid)
                }
            })
        }

    };
    return (
        <>
            <section className='notification'>
                {sortedNotification && sortedNotification.length > 0 ?
                    sortedNotification.map((notification) => {
                        return (
                            <div className="notifications__item" key={notification._id}>
                                <div className="notifications__item__avatar">
                                    <img src={currentUser?.photoimage} />
                                </div>

                                <div className="notifications__item__content">
                                    <span className="notifications__item__title">{notification.title}</span>
                                    <span className="notifications__item__message">{notification.description}</span>
                                </div>

                                <div>
                                    <div className="notifications__item__option archive js-option">
                                        <span>{notification.price} EGB</span>
                                    </div>
                                    {/* <div onClick={() => deleteNotification(notification.uid)} className="notifications__item__option delete js-option"> */}
                                    <div className="notifications__item__option delete js-option">
                                        <span>{
                                            notification.date &&
                                            formatRelativeTime(Date.now() - notification.date)
                                        }</span>
                                    </div>
                                </div>
                            </div>

                        );
                    })

                    :
                    <>
                        {/* <h5 className="text-black">Notification is empty !</h5> */}
                        {/* <Link className='text-[#477cff] text-2xl' to="/" >Back To Home</Link> */}
                        <div className="nocart bg-dark p-5 text-center ng-star-inserted">
                            <h1><PiHeartBreakFill className='text-warning text-center inline-block  text-[#477cff]' size={80} /></h1>
                            <h5 className="text-black">Notification is empty !</h5>
                            <p className="text-black">Go Shopping and booking</p>
                            <Link className='text-[#477cff] text-2xl' to="/" >Back To Store</Link>
                        </div>
                    </>
                }
            </section>
        </>
    )
}

export default Notification