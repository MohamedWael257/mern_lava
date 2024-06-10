import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Logo from "../../assets/img/logo/03.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext'
import { Adminlink } from '../../context/Onlyadmin'
import Loader from '../loader/Loader'
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { cartitem, totalquantity } from '../../redux/slice/cartslice';
import Cookies from "universal-cookie";
import livechat from '../../assets/img/icon/live-chat.svg'
import mail from '../../assets/img/icon/mail.svg'
import clock from '../../assets/img/icon/clock.svg'
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
    const cookies = new Cookies();
    const activelink = ({ isActive }) => (isActive && `active`)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sidenav, setSidenav] = useState(false)
    const [sidecart, setSidecart] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const items = useSelector(cartitem);
    const totquantity = useSelector(totalquantity)
    const [loading, setLoading] = useState(false)
    // console.log(currentUser);
    // const [activeside, setActiveside] = useState(true)
    const showsidenav = () => {
        setSidenav(!sidenav);
    }

    const headerref = useRef()
    const [active, setActive] = useState(false)
    const [activeheader, setActiveheader] = useState(false)
    const handleScroll = () => {
        const scroll = window.pageYOffset;
        const shouldBeVisible = scroll > 50;
        setActiveheader(shouldBeVisible);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {/* <ToastContainer /> */}
            {currentUser &&
                <>
                    {loading ? <Loader />
                        :
                        <header>
                            <div className="header-top">
                                <div class="header-top-left">
                                    <div class="header-top-contact">
                                        <ul>
                                            <li>
                                                <div class="header-top-contact-icon">
                                                    <img className='translate-y-1' src={livechat} alt />
                                                </div>
                                                <div class="header-top-contact-info">
                                                    <Link to="/profile/chat">Live Chat</Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="header-top-contact-icon">
                                                    <img className='translate-y-1' src={mail} alt />
                                                </div>
                                                <div class="header-top-contact-info">
                                                    {/* <Link to="/cdn-cgi/l/email-protection#4f262129200f2a372e223f232a612c2022"><span
                                                        class="__cf_email__"
                                                        data-cfemail="90f9fef6ffd0f5e8f1fde0fcf5bef3fffd">[email&#160;protected]</span></Link> */}
                                                    <Link to="mailto:info@example.com">info@example.com</Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="header-top-contact-icon">
                                                    <img className='translate-y-1' src={clock} alt />
                                                </div>
                                                <div class="header-top-contact-info">
                                                    <Link to="/">Sun - Fri (08AM - 10PM)</Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="header-top-right">
                                    <div class="header-top-social">
                                        <Link className='inline-block' to="#"><i class="fab fa-facebook-f"></i></Link>
                                        <Link className='inline-block' to="#"><i class="fab fa-twitter"></i></Link>
                                        <Link className='inline-block' to="#"><i class="fab fa-instagram"></i></Link>
                                        <Link className='inline-block' to="#"><i class="fab fa-linkedin-in"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div ref={headerref} className={`${activeheader ? "main-navigation fixed-top" : "main-navigation"}`}>
                                <img className='logo' src={Logo} alt="" />
                                <FiMenu className='btn-h' onClick={showsidenav} />
                                {/* <button className="btn-h" onClick={showsidenav}>=</button> */}
                                <div className={`${sidenav ? "nav-menu active" : "nav-menu"}`}>
                                    <nav>
                                        <Adminlink>
                                            <NavLink className={activelink} to='/admin/dashboard' >Admin</NavLink>
                                        </Adminlink>
                                        <NavLink className={activelink} to="/">home</NavLink>
                                        <NavLink className={activelink} to="/booking">online booking</NavLink>
                                        <NavLink className={activelink} to="/store">store</NavLink>
                                        <NavLink className={activelink} to='/cart'>cart</NavLink>

                                        {
                                            items && items.length > 0 &&
                                            < div className={`${sidecart ? "sidecart active" : "sidecart"}`}>
                                                <button onClick={() => setSidecart(false)}>X</button>
                                                {
                                                    items.map((ele, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <p>{ele.title}</p>
                                                                <p >{ele.itemquantity}</p>
                                                                <button onClick={() => dispatch(addtocart(ele))}>+</button>
                                                                <button onClick={() => dispatch(decrease(ele))}>-</button>

                                                            </div>
                                                        )
                                                    })
                                                }
                                                <Link to='/cart' onClick={() => setSidecart(false)}>View All Cart</Link>
                                            </div>
                                        }
                                        <div className="dropdown" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
                                            <button className='dropdown-btn' onClick={() => setActive(!active)}>
                                                <span>pages</span>
                                                <span className='translate-y-1 inline-block'>

                                                    <ion-icon name="chevron-down-outline"></ion-icon>
                                                </span>
                                            </button>
                                            <div className={`${active ? 'dropdown-menu active' : 'dropdown-menu'}`}>
                                                <NavLink className={activelink} to="/about">about</NavLink>
                                                {/* <NavLink className={activelink} to="/blog">blog</NavLink> */}
                                                {/* <NavLink className={activelink} to="/testimonials">testimonials</NavLink> */}
                                                <NavLink className={activelink} to="/services">services</NavLink>
                                                <NavLink className={activelink} to="/news">news</NavLink>
                                                <NavLink className={activelink} to="/team">team</NavLink>
                                                <NavLink className={activelink} to="/faq">FAQ</NavLink>
                                                <NavLink className={activelink} to="/404">404</NavLink>
                                                <NavLink className={activelink} to="/contact">contact</NavLink>
                                            </div>
                                        </div>

                                    </nav>

                                    <div className="account">
                                        {
                                            currentUser &&
                                            <>
                                                <Link to="/profile">
                                                    <span className='translate-y-1'>{currentUser?.username}</span>
                                                    <img src={currentUser?.photoimage} className='ml-2 w-8 h-8 rounded-full' alt="" />
                                                </Link>
                                                {/* <button onClick={logouthandler}>Logout</button> */}
                                            </>

                                        }

                                    </div>
                                </div >
                            </div>


                        </header >
                    }
                </>
            }
        </>
    )
}

export default Navbar