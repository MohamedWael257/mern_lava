import React, { useContext } from 'react'
import ChatHeader from './maincontnentitems/ChatHeader';
import Chats from './maincontnentitems/Chats';
import Input from './maincontnentitems/Input';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../../../context/AuthContext';

const MainContent = ({ selectedUser, setSelectedUser, activetype, setActivetype }) => {
    const { currentUser } = useContext(AuthContext)
    return (
        <>
            {/* <div>MainContent</div> */}
            {selectedUser ? (
                <div className="relative">
                    {/* <p>{selectedUser.username}</p> */}
                    <ChatHeader
                        currentUser={currentUser}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}

                    />
                    {/* <p>Input</p> */}
                    <Chats
                        currentUser={currentUser}
                        selectedUser={selectedUser}
                        activetype={activetype}
                        setActivetype={setActivetype}
                    />
                    <Input
                        currentUser={currentUser}
                        selectedUser={selectedUser}
                        activetype={activetype}
                        setActivetype={setActivetype}
                    />
                    {/* <ChatPartnerHeader user={selectedUser} />
      <Chats selectedUser={selectedUser} />
      <Input selectedUser={selectedUser} /> */}
                </div>
            ) : (
                <div className="bg-slate-200  h-full flex justify-center items-center text-center flex-col">
                    {/* <Logo /> */}
                    <p className="mt-8">Click on the user to start chatting...</p>
                </div>
            )}
        </>)
}

export default MainContent