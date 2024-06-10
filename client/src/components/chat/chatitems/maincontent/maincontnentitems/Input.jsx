import React, { useState } from 'react'
import { ImAttachment } from 'react-icons/im'
import { MdPhotoCameraBack } from 'react-icons/md'
import { AiOutlineSend } from 'react-icons/ai'
import axios from 'axios'
import { toast } from 'react-toastify'
const Input = ({ selectedUser, currentUser, activetype, setActivetype }) => {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const sendMessage = async (e) => {
        setMessage("");
        if (message.trim() !== "") {
            const serverTimestamp = new Date().toISOString();
            await axios.post(`${process.env.BASE_API_URL_HOST}/chat/add-chat`, {
                senderId: currentUser?._id,
                receiverId: selectedUser._id,
                message,
                timestamp: serverTimestamp
            })
                .then(res => toast.success(res.data))
                .catch(err => toast.error(err.message))

        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    const handleSendClick = () => {
        sendMessage();
        // setActivetype(false)
    };
    return (
        <>
            {/* <div>Input</div> */}
            <div className="bg-slate-100   h-16 border-t border-slate-200 flex items-center px-8 gap-4">

                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full rounded-lg h-11 bg-white   shadow px-4"
                        placeholder="Type something..."
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            // setActivetype(true)
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <AiOutlineSend
                    className="cursor-pointer text-gray-600  w-200 text-4xl"
                    style={{ fontSize: 28 }}
                    onClick={handleSendClick}
                />
            </div>
        </>
    )
}

export default Input