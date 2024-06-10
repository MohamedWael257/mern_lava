import React, { useContext, useEffect, useRef, useState } from 'react'
// import './Navbar.css'
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
                            <div className="header-top relative px-40 py-2 bg-[#263788] z-[1] overflow-hidden flex items-center justify-between">
                                <div className="header-top-left ">
                                    <div className="header-top-contact  ">
                                        <ul className='flex items-center gap-6'>
                                            <li className='flex items-center gap-1'>
                                                <div className="header-top-contact-icon w-9 h-9 leading-9 rounded-full text-center">
                                                    <img className='translate-y-1 w-6' src={livechat} alt />
                                                </div>
                                                <div className="header-top-contact-info">
                                                    <Link className='text-[#fff] font-medium' to="/profile/chat">Live Chat</Link>
                                                </div>
                                            </li>
                                            <li className='flex items-center gap-1'>

                                                <div className="header-top-contact-icon w-9 h-9 leading-9 rounded-full text-center">
                                                    <img className='translate-y-1 w-6' src={mail} alt />
                                                </div>
                                                <div className="header-top-contact-info">
                                                    {/* <Link className='text-[#fff] font-medium' to="/cdn-cgi/l/email-protection#4f262129200f2a372e223f232a612c2022"><span
                                                        className="__cf_email__"
                                                        data-cfemail="90f9fef6ffd0f5e8f1fde0fcf5bef3fffd">[email&#160;protected]</span></Link> */}
                                                    <Link className='text-[#fff] font-medium' to="mailto:info@example.com">info@example.com</Link>
                                                </div>
                                            </li>
                                            <li className='flex items-center gap-1'>

                                                <div className="header-top-contact-icon w-9 h-9 leading-9 rounded-full text-center">
                                                    <img className='translate-y-1 w-6' src={clock} alt />
                                                </div>
                                                <div className="header-top-contact-info">
                                                    <Link className='text-[#fff] font-medium' to="/">Sun - Fri (08AM - 10PM)</Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="header-top-right flex items-center gap-4">
                                    <div className="header-top-social">
                                        <Link className='inline-block w-9 h-9 leading-9 text-[#2db7ff] text-xl bg-[#fff] text-center ml-2 rounded-lg transition-all hover:bg-[#2db7ff] hover:text-[#fff]' to="#"><i className="fab fa-facebook-f"></i></Link>
                                        <Link className='inline-block w-9 h-9 leading-9 text-[#2db7ff] text-xl bg-[#fff] text-center ml-2 rounded-lg transition-all hover:bg-[#2db7ff] hover:text-[#fff]' to="#"><i className="fab fa-twitter"></i></Link>
                                        <Link className='inline-block w-9 h-9 leading-9 text-[#2db7ff] text-xl bg-[#fff] text-center ml-2 rounded-lg transition-all hover:bg-[#2db7ff] hover:text-[#fff]' to="#"><i className="fab fa-instagram"></i></Link>
                                        <Link className='inline-block w-9 h-9 leading-9 text-[#2db7ff] text-xl bg-[#fff] text-center ml-2 rounded-lg transition-all hover:bg-[#2db7ff] hover:text-[#fff]' to="#"><i className="fab fa-linkedin-in"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div ref={headerref} className={`main-navigation relative w-full p-4 flex justify-evenly bg-[#fff] z-30 shadow-[0 0 40px 5px rgb(0 0 0/5%)] ${activeheader ? "fixed-top shadow-[0 0 15px rgba(0, 0, 0, .17)] fixed top-0 left-0 right-0 z-50 w-full " : ""}`}>
                                <img className='logo w-[200px] h-[50px]' src={Logo} alt="" />
                                {/* <FiMenu className='btn-h' /> */}
                                <button className="btn-h hidden text-5xl font-medium bg-transparent text-[#2db6fe] cursor-pointer" onClick={showsidenav}>=</button>
                                <div className={`nav-menu flex${sidenav ? " active" : ""}`}>
                                    <nav className='flex'>
                                        <Adminlink>
                                            <NavLink className={`${activelink}  translate-y-3 ml-6 text-xl capitalize text-[#263787] transition-colors font-medium hover:text-[#2db6fe]`} to='/admin/home' >Admin</NavLink>
                                        </Adminlink>
                                        <NavLink className={`${activelink}  translate-y-3 ml-6 text-xl capitalize text-[#263787] transition-colors font-medium hover:text-[#2db6fe]`} to="/">home</NavLink>
                                        <NavLink className={`${activelink}  translate-y-3 ml-6 text-xl capitalize text-[#263787] transition-colors font-medium hover:text-[#2db6fe]`} to="/booking">online booking</NavLink>
                                        <NavLink className={`${activelink}  translate-y-3 ml-6 text-xl capitalize text-[#263787] transition-colors font-medium hover:text-[#2db6fe]`} to="/store">store</NavLink>
                                        <NavLink className={`${activelink}  translate-y-3 ml-6 text-xl capitalize text-[#263787] transition-colors font-medium hover:text-[#2db6fe]`} to='/cart'>cart</NavLink>
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
                                        <div className="dropdown mx-6 relative translate-y-[10px]" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
                                            <button className='dropdown-btn translate-y-0 bg-transparent text-xl capitalize text-[#263787] transition-colors font-medium' onClick={() => setActive(!active)}>
                                                <span>pages</span>
                                                <span className='translate-y-1 inline-block'>

                                                    <ion-icon name="chevron-down-outline"></ion-icon>
                                                </span>
                                            </button>
                                            <div className={`dropdown-menu bg-[#263787] shadow-[0 0 10px rgb(0, 0, 0)] absolute top-[65px] right-[-55px]  w-[200px] border-t-8 border-[#2db6fe] py-2 z-[3333]  transition-all ${active ? 'opacity-100 visible h-[400px]' : 'h-0 opacity-0 invisible'}`}>
                                                <NavLink className={`${activelink} text-[#fff] text-center border-b-white text-2xl mb-5 capitalize  transition-colors font-medium hover:text-[#2db6fe]`} to="/sbout">about</NavLink>
                                                <NavLink className={`${activelink} text-[#fff] text-center border-b-white text-2xl mb-5 capitalize  transition-colors font-medium hover:text-[#2db6fe]`} to="/services">services</NavLink>
                                                <NavLink className={`${activelink} text-[#fff] text-center border-b-white text-2xl mb-5 capitalize  transition-colors font-medium hover:text-[#2db6fe]`} to="/news">news</NavLink>
                                                <NavLink className={`${activelink} text-[#fff] text-center border-b-white text-2xl mb-5 capitalize  transition-colors font-medium hover:text-[#2db6fe]`} to="/team">team</NavLink>
                                                <NavLink className={`${activelink} text-[#fff] text-center border-b-white text-2xl mb-5 capitalize  transition-colors font-medium hover:text-[#2db6fe]`} to="/faq">FAQ</NavLink>
                                                <NavLink className={`${activelink} text-[#fff] text-center border-b-white text-2xl mb-5 capitalize  transition-colors font-medium hover:text-[#2db6fe]`} to="/404">404</NavLink>
                                                <NavLink className={`${activelink} text-[#fff] text-center border-b-white text-2xl mb-5 capitalize  transition-colors font-medium hover:text-[#2db6fe]`} to="/contact">contact</NavLink>
                                            </div>
                                        </div>

                                    </nav>

                                    <div className="account">
                                        {
                                            currentUser &&
                                            <>
                                                <Link to="/profile" className='mr-[15px] text-[16px] px-[13px] py-[22px] bg-transparent text-[#263787] rounded-[10px] font-medium border-2 border-[#263787] cursor-pointer overflow-hidden relative z-[1] transition-all -translate-y-1 inline-flex hover:text-black hover:delay-1000 hover:border-[#2db6fe]'>
                                                    <span className='translate-y-1'>{currentUser?.username}</span>
                                                    {
                                                        currentUser?.photoimage &&
                                                        <img src={currentUser?.photoimage} className='ml-2 w-8 h-8 rounded-full' alt="" />
                                                    }
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