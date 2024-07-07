import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import './Allcomments.css'
import { FaUserCircle } from 'react-icons/fa';
const Allcomments = () => {
    const { currentUser } = useContext(AuthContext)
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const getcomments = async () => {
            if (currentUser?.email === 'admin@gmail.com') {
                await axios.get(`${process.env.BASE_API_URL_HOST}/testimonial/testimonialData`)
                    .then(res => {
                        setComments(res.data.data)
                    })
                    .catch(err => console.log(err))
            }
        }
        getcomments();
    }, [])
    return (
        <>
            <h2 className='text-4xl text-center my-8 font-semibold text-[#263787]'>All Comments</h2>
            <section className="comments">
                {
                    comments && comments.map((comment, index) => {
                        return (
                            <div className="comment" key={index}>
                                {
                                    comment.photoimage ?
                                        <img className='photoimage' src={comment.photoimage} alt="" />
                                        :
                                        <FaUserCircle className=' photoimage' color="#263787" />

                                }
                                <p className='username'>{comment.firstname} {comment.lastname}</p>
                                <p className='email'>{comment.email}</p>
                                <p className='phone'>{comment.phone}</p>
                                <p className='phone'>{comment.message}</p>
                                <p className='phone'>{comment.date}</p>

                            </div>
                        )
                    })
                }
            </section>
        </>
    )
}

export default Allcomments