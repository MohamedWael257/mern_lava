import React, { useEffect, useState } from "react";
// import Infobox from "../../ui/Infobox";
import styles from "./Home.module.css"
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { bookingshistory, earning, calcearning } from "../../../redux/slice/bookingslice"
import { useSelector, useDispatch } from "react-redux";
import ChartsBooking from "../chart/ChartsBooking"
import { servicesdata } from "../../../redux/slice/serviceslice";
const Adminhomebooking = () => {
    const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
    const productIcon = <BsCart4 size={30} color="#1f93ff" />;
    const ordersIcon = <FaCartArrowDown size={30} color="orangered" />
    const dispatch = useDispatch();
    const product = useSelector(servicesdata);
    // const [product, setProduct] = useState([]);
    const booking = useSelector(bookingshistory);
    const earn = useSelector(earning)
    useEffect(() => {
        dispatch(calcearning());
    })
    return (
        <div className={styles.container}>
            <h2 className="font-semibold text-2xl text-[#1f93ff] text-center mt-2 mb-4">Statistics About Booking</h2>
            <div className={styles.infobox}>
                <div className={`${styles.box} ${styles.card1}`}>
                    <p>Earning</p>
                    <div className={styles.content}>
                        <p>{earn}</p>
                        {earningIcon}
                    </div>
                </div>
                <div className={`${styles.box} ${styles.card2}`}>
                    <p>Services</p>
                    <div className={styles.content}>
                        <p>{product.length}</p>
                        {productIcon}
                    </div>
                </div>
                <div className={`${styles.box} ${styles.card3}`}>
                    <p>Booking</p>
                    <div className={styles.content}>
                        <p>{booking.length}</p>
                        {ordersIcon}
                    </div>
                </div>

            </div>
            <div className={styles.chart}>
                <ChartsBooking order={booking} />
            </div>
        </div>
    )
}
export default Adminhomebooking