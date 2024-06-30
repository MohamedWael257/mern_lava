import React, { useContext } from "react";
// import'from "./Adminnav.module.css"
import '../../profile/profilenav/Profilenav.css'
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext'
import { FaUsersGear } from "react-icons/fa6"
import { FaChartBar, FaProductHunt, FaComments } from "react-icons/fa";
import { MdAddChart, MdOutlineCleaningServices } from "react-icons/md";

const Adminnav = () => {
    const { currentUser } = useContext(AuthContext)
    const userName = currentUser?.email
    const activelink = ({ isActive }) => (isActive ? `active` : `links`)
    return (
        <div className='nav'>
            <div className='user'>
                <FaUserCircle className='icon inline-block mb-2' size={60} color="#fff" />
                <h4>{userName}</h4>
            </div>
            <div className='listcontainer'>
                <ul className='list'>
                    {/* <li>
                        <NavLink to="/admin/dashboard" className={activelink}>
                            Dashboard
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/admin/all-users" className={activelink}>
                            <FaUsersGear size={35} className='inline-block mr-2' />
                            All Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/all-comments" className={activelink}>
                            <FaComments size={35} className='inline-block mr-2' />
                            All Comments
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/home-orders" className={activelink}>
                            <FaChartBar size={35} className='inline-block mr-2' />
                            Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/all-products" className={activelink}>
                            <FaProductHunt size={35} className='inline-block mr-2' />
                            All Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/add-product/Add" className={activelink}>
                            <MdAddChart size={35} className='inline-block mr-2' />
                            Add Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/home-booking" className={activelink}>
                            <FaChartBar size={35} className='inline-block mr-2' />
                            Booking
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/all-services" className={activelink}>
                            <MdOutlineCleaningServices size={35} className='inline-block mr-2' />
                            All Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/add-service/Add" className={activelink}>
                            <MdAddChart size={35} className='inline-block mr-2' />
                            Add Service
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Adminnav;