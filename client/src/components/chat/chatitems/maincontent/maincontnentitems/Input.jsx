import React, { useState } from 'react'
import { ImAttachment } from 'react-icons/im'
import { MdPhotoCameraBack } from 'react-icons/md'
import { AiOutlineSend } from 'react-icons/ai'
import axios from 'axios'
import Loader from "../../../../../assets/img/oval.svg";

import { toast } from 'react-toastify'
const Input = ({ selectedUser, currentUser, activetype, setActivetype }) => {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };
    console.log('image', image);
    const sendMessage = async (e) => {
        // e.preventDefault();
        setUploading(true)
        const serverTimestamp = new Date().toISOString();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("senderId", currentUser?._id);
        formData.append("receiverId", selectedUser?._id);
        formData.append("message", message);
        formData.append("timestamp", serverTimestamp);
        setMessage("");
        if (message.trim() !== "" || image) {
            await axios.post(`${process.env.BASE_API_URL_HOST}/chat/add-chat`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(res => {
                    // toast.success(res.data.status)
                    setUploading(false);
                    setImage(null);
                    setImagePreview(null);
                })
                .catch(err => {
                    // toast.error(err.message)
                    setUploading(false);
                    setImage(null);
                    setImagePreview(null);
                })

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
                <label htmlFor="file">
                    <MdPhotoCameraBack
                        className="text-gray-600   w-200 text-4xl cursor-pointer"
                        style={{ fontSize: 28 }}
                    />
                </label>
                <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {/* <label htmlFor="file">
                    <ImAttachment
                        className="cursor-pointer text-gray-600  w-200 text-4xl"
                        style={{ fontSize: 28 }}
                    />
                </label> */}
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
                    {imagePreview && (
                        <div className="absolute bottom-16 left-0 right-0 top-16 border-4 border-slate-400 border-dashed flex justify-center items-center bg-slate-200">
                            {/* {uploading && <img src={Loader} className="absolute w-20" />} */}
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: "50%", maxHeight: "80%" }}
                            />
                        </div>
                    )}
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