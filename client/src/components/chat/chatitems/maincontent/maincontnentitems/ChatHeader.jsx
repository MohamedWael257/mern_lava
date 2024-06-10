import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsTelephone, BsCameraVideo } from 'react-icons/bs'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const ChatHeader = ({ selectedUser, setSelectedUser, currentUser }) => {
    const [toggleMore, setToggleMore] = useState(false);
    const handleClearMessages = async () => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/chat/clear-chat`, { userid: currentUser?._id, selectedid: selectedUser._id })
            .then(
                res => {
                    toast.success(res.data.data)
                    setToggleMore(false);
                })
            .catch(err => {
                toast.error(err.data.data)
                setToggleMore(false);

            })
    };
    return (
        <>
            {/* <div>{currentUser.username}</div> */}
            <div className="h-16 flex py-2 px-6 justify-between items-center bg-slate-100   border-b dark:border-stone-700">
                <div className="flex items-center gap-8">
                    <FaArrowLeft size={25} onClick={() => { setSelectedUser(null) }} />

                    {selectedUser?.photoimage ? (
                        <img className='w-12 h-12 rounded-full border-[4px] border-black' src={selectedUser?.photoimage} />
                    ) : (
                        <p className='bg-slate-400 p-4 h-8 w-8 grid place-content-center rounded-full'>{selectedUser?.username?.[0]}</p>
                    )}
                    <h4 className="font-semibold" >{selectedUser?.username}</h4>
                </div>
                <div className="flex items-center gap-8">
                    {/* <Link to='/profile'>
                        <BsTelephone size={25} />
                    </Link> */}
                    {/* <BsCameraVideo size={25} /> */}
                    <div>
                        <div
                            className={`cursor-pointer p-2 ${toggleMore ? "bg-slate-200  " : ""
                                } rounded-full`}
                            onClick={() => setToggleMore(!toggleMore)}
                        >
                            <FiMoreHorizontal size={25} />
                        </div>
                        {toggleMore && (
                            <div className="absolute top-14 right-4 w-48 bg-white  py-2 rounded shadow border z-10">
                                <div
                                    className="cursor-pointer hover:bg-slate-100  py-2 px-5 text-slate-700  flex gap-2 items-center"
                                    onClick={handleClearMessages}
                                >
                                    Clear messages
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatHeader