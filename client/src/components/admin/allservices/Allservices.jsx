import React, { useEffect, useState } from "react";
import styles from "./Allservices.module.css"
import { filterproduct, filterBySearch, filterByCategory } from "../../../redux/slice/filterslice"
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getservices, servicesdata } from "../../../redux/slice/serviceslice";
import axios from "axios";

const Allservices = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const selectservices = useSelector(servicesdata);
    const filteredservices = useSelector(filterproduct)
    const currentservices = filteredservices.length === 0 ? selectservices : filteredservices;
    useEffect(() => {
        dispatch(filterBySearch({ product: selectservices, search: searchValue }))
    }, [dispatch, searchValue, selectservices])
    const filterbycategory = (cat) => {
        dispatch(filterByCategory({ product: selectservices, category: cat }));
    }
    const deleteproduct = async (id) => {
        try {
            await axios.get(`${process.env.BASE_API_URL_HOST}/products/delete-service/${id}`)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            dispatch(getservices())

            toast.success("Product Deleted successful", {
                position: "top-right",
            })

        }
        catch (error) {
            toast.error(error.message)
        }

    }
    return (
        <div className={styles.container}>
            <h2>All Services</h2>
            <p>{currentservices.length} Services found</p>
            <div className={styles.search}>
                <input type="text" placeholder={`Search by name`} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>s/n</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Price</th>
                        {/* <th>N_of_Watches</th> */}
                        <th>N_of_book</th>
                        {/* <th>Rate</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentservices.map((pro, index) => {
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td className="p-4">
                                    <img className={styles.imgg} src={pro.ImageUrl} />
                                </td>
                                <td>{pro.title}</td>
                                <td>{pro.serviceduration}</td>
                                <td>{pro.serviceprice} EGB</td>
                                {/* <td>{pro.rating.N_of_Watches} views</td> */}
                                <td>{pro.rating.N_of_Book} times</td>
                                {/* <td>{pro.rating.rate}</td> */}
                                <td>
                                    <Link to={`/admin/add-service/${pro.id}`}>
                                        <FaEdit className={styles.catbtn} size={25} color="green" />
                                    </Link>
                                    <FaTrashAlt className={styles.catbtn} size={25} cursor="pointer" color="red" onClick={() => deleteproduct(pro.id)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Allservices