import React, { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns';
import axios from 'axios';
const Chats = ({ selectedUser, currentUser, activetype, setActivetype }) => {
    const [messages, setMessages] = useState([]);
    const [showimg, setShowimg] = useState('');
    const [selectedImg, setSelectedImg] = useState('');
    const chatRef = useRef(null);

    useEffect(() => {
        axios.post(`${process.env.BASE_API_URL_HOST}/chat/chatsData`, { userid: currentUser?._id, selectedid: selectedUser._id })
            .then(res => setMessages(res.data.data))
            .catch(err => console.log(err))

    }, [selectedUser, currentUser?._id, messages]);

    useEffect(() => {
        if (messages && messages.length > 0) {
            setMessages(messages)
        }
    }, [messages])
    const handelImageClick = (img) => {
        setShowimg(true)
        setSelectedImg(img)
    }
    return (
        <>
            <div className="chats p-4 h-[calc(100vh-128px)] overflow-y-auto bg-slate-200 ">
                {messages &&
                    messages.map((message) => {
                        return (
                            <div
                                className={`relative flex ${message.senderId == currentUser._id
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                                key={message.timestamp}
                            >
                                <div
                                    className={`flex items-end shadow mb-1 py-1 px-2 rounded-lg max-w-[80%] lg:max-w-[60%] ${message.senderId == currentUser._id
                                        ? "bg-emerald-500 text-white rounded-tr-none"
                                        : "bg-white text-black rounded-tl-none"
                                        }`}
                                >
                                    <p className="py-1 px-2">{message.message}</p>

                                    {message.timestamp && (
                                        <p
                                            className={`text-[11px] ${message.senderId == currentUser._id
                                                ? "text-slate-200"
                                                : "text-black"
                                                }`}
                                        >
                                            {format(message.timestamp, "HH:mm")}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                }
                <div ref={chatRef}></div>
            </div>
        </>
    )
}

export default Chats