import React, { useContext, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../context/AuthContext'
import { Col, Container, Row } from 'react-bootstrap'
import './Contact.css'
import 'animate.css';
import contactImg from "../../assets/contact-img.svg";
import { FaPhone } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import axios from 'axios';
import { toast } from 'react-toastify'
import HeroCard from '../ui/herocard/HeroCard'
const Contact = () => {
    const { currentUser } = useContext(AuthContext)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState('')
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    const Submitevent = async (e) => {
        const photoimage = currentUser?.photoimage ? currentUser?.photoimage : ""
        e.preventDefault()
        setLoading(true)
        await axios.post(`${process.env.BASE_API_URL_HOST}/testimonial/send-testimonial`, { uid: currentUser?._id, firstname, lastname, email, phone, message, date: dateTime, photoimage: photoimage })
            .then(res => {
                toast.success(res.data.status)
                // console.log(res)
                setLoading(false)
            })
            .catch(err => {
                toast.error('Error Sending')
                // console.log(err)
                setLoading(false)
            })
    }
    return (
        <>
            <HeroCard page={'Contact'} />
            <div className="contact">
                <Container>
                    <Row className="align-items-center grid grid-cols-2">
                        <Col size={12} md={6}>
                            <img src={contactImg} alt="Contact Us" />

                        </Col>
                        <Col size={12} md={6}>
                            <div >
                                <h2>Get In Touch</h2>
                                <form >
                                    <Row className='grid grid-cols-2'>
                                        <Col size={12} sm={6} className="px-1">
                                            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" />
                                        </Col>
                                        <Col size={12} sm={6} className="px-1">
                                            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" />
                                        </Col>
                                        <Col size={12} sm={6} className="px-1">
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                                        </Col>
                                        <Col size={12} sm={6} className="px-1">
                                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone No." />
                                        </Col>
                                    </Row>
                                    <Col size={12} className="px-1">
                                        <textarea rows="6" placeholder="Message"></textarea>
                                        <button type="submit" onClick={Submitevent} className='block mx-auto'>
                                            {loading ? 'Sending...' : 'Send'}
                                        </button>
                                    </Col>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>

    )
}

export default Contact