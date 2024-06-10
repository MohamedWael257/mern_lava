import React, { useContext, useState } from "react";
import "./Admin.css"
import { Route, Routes } from "react-router-dom";
import Adminnav from "./adminnav/Adminnav";
import Allusers from "./allusers/Allusers";
import Allcars from "./allcars/Allcars";
import Addcar from "./addcar/Addcar";
import Allaccessories from "./allaccessories/Allaccessories";
import Addaccessory from "./addaccessory/Addaccessory";
import Allservices from "./allservices/Allservices.jsx";
import Addservice from "./addservice/Addservice.jsx";
import Allproducts from "./allproducts/Allproducts.jsx";
import Addproduct from "./addproduct/Addproduct.jsx";
import Adminhomeorders from "./adminhome/Adminhomeorders";
import Adminhomebooking from "./adminhome/Adminhomebooking.jsx";
import { FiMenu } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";


const Admin = () => {
    const { currentUser } = useContext(AuthContext)
    const [activebar, setActivebar] = useState(true)
    return (
        <>
            <div className="admin">
                <div className={`navbar ${activebar && 'active'}`}>
                    <Adminnav />
                </div>

                <div className={`content ${activebar && 'active'}`}>
                    <Routes>
                        {/* <Route path="" element={<Dashboard />} /> */}
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="all-users" element={<Allusers />} />
                        <Route path="all-products" element={<Allproducts />} />
                        <Route path="add-product/:id" element={<Addproduct />} />
                        <Route path="all-services" element={<Allservices />} />
                        <Route path="add-service/:id" element={<Addservice />} />
                        <Route path="home-orders" element={<Adminhomeorders />} />
                        <Route path="home-booking" element={<Adminhomebooking />} />

                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Admin