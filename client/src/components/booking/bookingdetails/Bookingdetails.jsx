import React, { useEffect, useState } from 'react'
import '../Booking.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addservicetobooking, bookingitem, confirmbookingdetails, datetime, totalprice } from '../../../redux/slice/bookingslice'
import image1 from '../../../assets/img/bodystyle/sedan.png'
import image2 from '../../../assets/img/bodystyle/crossover.png'
import image3 from '../../../assets/img/bodystyle/van.png'
import image4 from '../../../assets/img/bodystyle/car.png'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { servicesdata } from '../../../redux/slice/serviceslice'
import { productsdata } from '../../../redux/slice/productsslice'

const Bookingdetails = () => {
    const services = useSelector(servicesdata)
    const products = useSelector(productsdata)
    const cars = [...new Set(products?.filter((car) => car.category == "Cars"))];
    const [bodystyle, setBodystyle] = useState(null)
    const [bodytype, setBodytype] = useState('')
    const [typebrand, setTypebrand] = useState('')
    const [typemodel, setTypemodel] = useState('')
    const [model, setModel] = useState([])
    const [platenumber, setPlatenumber] = useState('')
    const [typecolor, setTypecolor] = useState('')
    const [color, setColor] = useState('')
    const [totprice, setTotprice] = useState('')
    const [hour, setHour] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const bookingservices = useSelector(bookingitem)
    useEffect(() => {
        bookingservices.map(ele => {
            if (ele.time) {
                navigate('/Bookingconfirm')
            }
        })
    }, [bookingservices])
    const { id } = useParams();
    const productdetails = services.filter((pro) => pro.id === id);
    const serviceprice = +productdetails[0]?.serviceprice
    const selectBodyStyle = (ele) => {
        setTypebrand('')
        setTypemodel('')
        setTypecolor('')
        const res = cars.filter(obj => obj.bodyStyle === ele)
        setBodystyle(res)
    }
    useEffect(() => {
        if (!productdetails) {
            navigate('/booking')
        }
    }, [productdetails])
    const brand = [
        "Brand",
        ...new Set(bodystyle?.map((car) => car.title)),
    ];
    const selectBrand = (ele) => {
        setTypebrand(ele)
        const resmodel = bodystyle.filter(obj => obj.title === ele)
        resmodel.map(ele => setModel(ele.model))
        const rescolor = bodystyle.filter(obj => obj.title === ele)
        rescolor.map(ele => setColor(ele.color))
        const resprice = bodystyle.filter(obj => obj.title === ele)
        resprice.map(ele => setTotprice(+ele.serviceprice + +serviceprice))
    }
    const confirmservices_details = () => {
        let services_details = {
            id: productdetails[0]?.id,
            title: productdetails[0]?.title,
            serviceprice: productdetails[0]?.serviceprice,
            serviceduration: productdetails[0]?.serviceduration,
            brand: typebrand,
            color: typecolor,
            model: typemodel,
            tax: (+totprice - (+productdetails[0]?.serviceprice)),
            totprice: totprice
        }
        dispatch(addservicetobooking(services_details))

    }
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selected, setSelected] = useState(null);
    const handleDateChange = (date) => {
        var day = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        var dateTime = day;
        setSelected(dateTime)
        setSelectedDate(date);
    };
    let hoursAm = ['08:00', '09:00', '10:00', '11:00']
    let hoursPm = ['12:00', '01:00', '02:00', '03:00',]
    const [address, setAddress] = useState(null);
    const confirmbooking = () => {
        dispatch(confirmbookingdetails({ selected: selected, hour: hour, address: address }))
        navigate('/Bookingconfirm')
    }

    return (
        <>
            {/* <ToastContainer /> */}
            <section className='booking'>
                {bookingservices.length === 0 ?
                    <>
                        <div className="booking-details">
                            <div className="head">
                                <h2><b>Booking Details</b></h2>
                                <Link to="/booking">&larr; Back To Services</Link>
                            </div>
                            <div className="content" >
                                <div className="image">
                                    <img src={productdetails[0]?.ImageUrl} alt="detail" />
                                </div>
                                <div className="text">
                                    <p className="title">{productdetails[0]?.title}</p>
                                    <h5 className="price">{productdetails[0]?.serviceprice} EGB</h5>
                                    <p className="description">{productdetails[0]?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="booking-form">
                            <div className="body-style">
                                <h2 className='text-[#007bff]'>Body Style</h2>
                                <div className="styles">
                                    {/* <img className={`bg-white p-3 rounded-xl cursor-pointer ${bodytype == 'sedan' ? "active" : ""}`} src={image1} onClick={() => { selectBodyStyle("sedan"); setBodytype("sedan") }} alt="detail" />
                                    <img className={`bg-white p-3 rounded-xl cursor-pointer ${bodytype == 'suv' ? "active" : ""}`} src={image2} onClick={() => { selectBodyStyle("suv"); setBodytype("suv") }} alt="detail" />
                                    <img className={`bg-white p-3 rounded-xl cursor-pointer ${bodytype == 'van' ? "active" : ""}`} src={image3} onClick={() => { selectBodyStyle("van"); setBodytype("van") }} alt="detail" />
                                    <img className={`bg-white p-3 rounded-xl cursor-pointer ${bodytype == 'pickup' ? "active" : ""}`} src={image4} onClick={() => { selectBodyStyle("pickup"); setBodytype("pickup") }} alt="detail" />
                                    <img className={`bg-white p-3 rounded-xl cursor-pointer ${bodytype == 'sport' ? "active" : ""}`} src={image1} onClick={() => { selectBodyStyle("sport"); setBodytype("sport") }} alt="detail" /> */}
                                    <img className='bg-white p-3 rounded-xl cursor-pointer' src={image1} onClick={() => selectBodyStyle("sport")} alt="detail" />
                                    <img className='bg-white p-3 rounded-xl cursor-pointer' src={image2} onClick={() => selectBodyStyle("sport")} alt="detail" />
                                    <img className='bg-white p-3 rounded-xl cursor-pointer' src={image3} onClick={() => selectBodyStyle("sport")} alt="detail" />
                                    <img className='bg-white p-3 rounded-xl cursor-pointer' src={image4} onClick={() => selectBodyStyle("sport")} alt="detail" />
                                    <img className='bg-white p-3 rounded-xl cursor-pointer' src={image1} onClick={() => selectBodyStyle("sport")} alt="detail" />
                                </div>
                            </div>
                            {bodystyle &&
                                <div className="card-details">
                                    <select aria-label="Default select example" className='bg-transparent border p-3 rounded-xl text-xl form-select' onChange={(e) => {
                                        // setTypebrand(e.target.value);
                                        selectBrand(e.target.value)
                                        // filterbycategory(e.target.value);
                                    }}>
                                        {brand.map((cat, index) => {
                                            return (
                                                <option key={index} value={cat}>{cat}</option>
                                            )
                                        })}
                                    </select>
                                    {typebrand &&
                                        <>
                                            <select aria-label="Default select example" className='bg-transparent border p-3 rounded-xl text-xl form-select' onChange={(e) => {
                                                setTypemodel(e.target.value);
                                                // filterbycategory(e.target.value);
                                            }}>
                                                <option value="model">Model</option>
                                                {model && model.map((cat, index) => {
                                                    return (
                                                        <option key={index} value={cat}>{cat}</option>
                                                    )
                                                })}
                                            </select>
                                            <input type="text" className='bg-transparent border-2 border-black p-3 rounded-xl text-xl' value={platenumber} maxLength={3} placeholder='Plate Number' onChange={(e) => setPlatenumber(e.target.value)} />
                                            <br />
                                        </>
                                    }
                                    {typemodel && platenumber && platenumber.length === 3 &&
                                        <>
                                            <label htmlFor="">car Color</label>
                                            <div className="color flex">
                                                {color && color.map((cat, index) => {
                                                    return (
                                                        <p key={index} className={`w-10 h-10 mx-2 rounded-full cursor-pointer border-black  border-2`} style={{ backgroundColor: `${cat}` }} onClick={() => setTypecolor(cat)}></p>
                                                        // <option key={index} value={cat}>{cat}</option>
                                                    )
                                                })}
                                            </div>
                                        </>
                                    }
                                    {typebrand && typemodel && platenumber && platenumber.length === 3 && typecolor &&
                                        <button className=' rounded-xl text-2xl py-3 px-6 text-white bg-[#007bff]' onClick={confirmservices_details}>Next</button>
                                    }
                                </div>
                            }
                        </div>
                        {/* <Recommendation /> */}
                    </>
                    :
                    <>
                        <h1 className='my-4'>Select Day</h1>
                        <Calendar
                            className={`custom-calendar`}
                            value={selectedDate}
                            onChange={handleDateChange}
                            locale="en-US"
                            showWeekNumbers
                            showNeighboringMonth
                        />
                        <div className="hours">
                            {
                                hoursAm.map((ele, index) => {
                                    return (
                                        <>
                                            <p className={`${hour.includes(ele) ? "text-black" : "text-white bg-[#007bff]"}`} key={index} onClick={() => setHour(ele + " AM")}>{ele}AM</p>
                                        </>
                                    )
                                })

                            }
                            {
                                hoursPm.map((ele, index) => {
                                    return (
                                        <>
                                            <p className={`${hour.includes(ele) ? "text-black" : "text-white bg-[#007bff]"}`} key={index} onClick={() => setHour(ele + " PM")}>{ele}PM</p>
                                        </>
                                    )
                                })

                            }
                        </div>
                        <div className="address">
                            <input type="text" className='bg-transparent border-2 border-black p-3 rounded-xl text-xl' placeholder='Enter the Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        {selected && hour && address &&
                            <>
                                <p className='my-4'>{selected + ' : ' + hour}</p>
                                {/* <p>{selectedDate}</p> */}
                                <button className='confirm rounded-xl text-2xl py-3 px-6 text-white bg-[#007bff]' onClick={confirmbooking}>Next</button>
                            </>
                        }
                    </>
                }
            </section>


        </>
    )
}

export default Bookingdetails
