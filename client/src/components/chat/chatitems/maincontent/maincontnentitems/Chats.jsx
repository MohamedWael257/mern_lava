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
                                {message.ImageUrl ? (
                                    <div
                                        className={`shadow mb-1 p-1 rounded-lg max-w-[80%] lg:max-w-[60%] ${message.senderId == currentUser._id
                                            ? "bg-emerald-500 text-white rounded-tr-none"
                                            : "bg-white text-slate-600 rounded-tl-none"
                                            }`}
                                    >
                                        <img
                                            src={message.ImageUrl}
                                            alt="Chat Image"
                                            className="max-w-[200px] mx-auto mb-2 rounded-md"
                                            onClick={() => handelImageClick(message.ImageUrl)}
                                        />
                                        {
                                            showimg &&
                                            (
                                                <div className="fixed flex items-center justify-center top-0 left-0 bg-slate-900 opacity-95 w-screen h-full z-50">
                                                    <p className="absolute z-50 text-white top-0 left-0 font-bold cursor-pointer"
                                                        style={{ fontSize: "3rem" }}
                                                        onClick={() => setShowimg(false)}
                                                    >X</p>
                                                    <img
                                                        src={selectedImg}
                                                        alt="Chat Image"
                                                        className="w-2/3 h-3/4 rounded-3xl"
                                                        style={{ border: "5px solid black" }}
                                                    />
                                                </div>
                                            )
                                        }
                                        <div className="flex justify-between items-end px-1">
                                            <p className="py-1 px-2">{message.message}</p>
                                            {message.timestamp && (
                                                <p
                                                    className={`text-[11px] ${message.senderId == currentUser._id
                                                        ? "text-slate-200"
                                                        : "text-slate-400"
                                                        }`}
                                                >
                                                    {format(message.timestamp, "HH:mm")}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ) :
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
                                }
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