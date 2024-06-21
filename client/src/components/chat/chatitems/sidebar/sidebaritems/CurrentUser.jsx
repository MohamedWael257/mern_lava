import React, { useContext, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../../../../context/AuthContext';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
const CurrentUser = () => {
    const { currentUser } = useContext(AuthContext)
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate()
    const cookies = new Cookies()
    const logouthandel = () => {
        cookies.remove("TOKEN");
        toast.success("logout succeessful...")
        window.location.href = "../login";
    }
    return (
        <>
            {/* <div>CurrentUser</div> */}
            <div className='relative h-16 bg-slate-100  border-b border-slate-200 dark:border-stone-700 flex justify-between items-center px-2 py-4'>
                <div className="flex items-center gap-3">
                    <img src={currentUser?.photoimage} className='w-10 h-10 rounded-full' alt="" />
                    <h4 >{currentUser?.username}</h4>
                </div>
                <div>
                    <div
                        className={`cursor-pointer p-2  ${toggle ? "bg-slate-200" : ""
                            } rounded-full`}
                        onClick={() => setToggle(!toggle)}
                    >
                        ...
                        {/* <MoreVertIcon /> */}
                    </div>
                    {toggle && (
                        <div className="absolute top-14 right-4 w-44 bg-white text-black     py-2 rounded shadow border">
                            <div
                                className="cursor-pointer hover:bg-slate-100   py-2 px-5 text-slate-700  flex gap-2 items-center"
                                onClick={logouthandel}
                            >
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* <hr style={{ height: '1rem' }} /> */}
        </>
    )
}

export default CurrentUser