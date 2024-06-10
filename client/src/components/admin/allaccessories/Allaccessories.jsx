import React, { useEffect, useState } from "react";
import styles from "./Allproducts.module.css"
import { filterproduct, filterBySearch, filterByCategory } from "../../../redux/slice/filterslice"
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { accessoriesdata, getAccessories } from "../../../redux/slice/accessoriesslice";

const Allaccessories = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const selectaccessories = useSelector(accessoriesdata);
    const filteredproduct = useSelector(filterproduct)
    const currentproduct = filteredproduct.length === 0 ? selectaccessories : filteredproduct;
    useEffect(() => {
        dispatch(filterBySearch({ product: selectaccessories, search: searchValue, category: "accessories" }))
    }, [dispatch, searchValue, selectaccessories])
    // const filterbycategory = (cat) => {
    //     dispatch(filterByCategory({ product: selectaccessories, category: cat }));
    // }
    // const category = [
    //     "All",
    //     ...new Set(selectaccessories.map((accessories) => accessories.category)),
    // ];
    // useEffect(() => {
    //     dispatch(getAccessories())
    // }, [dispatch, currentproduct])
    const deleteproduct = async (id) => {
        try {
            await axios.get(`${process.env.BASE_API_URL_HOST}/accessories/delete-accessory/${id}`)
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
            // await fetch(`http://localhost:5000/delete-product/${id}`, {
            // await fetch(`https://lava-11a9b-default-rtdb.firebaseio.com/accessories/${id}.json`, {
            // method: "DELETE",
            dispatch(getAccessories())

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
            <h2>All Accessories</h2>
            <h2>Categories</h2>
            {/* <select aria-label="Default select example" className={styles.category}
                onChange={(e) => {
                    filterbycategory(e.target.value);
                }}>

                {category.map((cat, index) => {
                    return (
                        <option key={index} value={cat} type='button' className={`${styles.catbtn}`}  >
                            {cat}
                        </option>
                    )
                })}
            </select> */}

            <p>{currentproduct.length} ccessories found</p>
            <div className={styles.search}>
                <input type="text" placeholder={`Search by name`} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>s/n</th>
                        <th>Image</th>
                        <th>Name</th>
                        {/* <th>Category</th> */}
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentproduct.map((pro, index) => {
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td className="p-4">
                                    <img className={styles.imgg} src={pro.ImageUrl} />
                                </td>
                                <td>{pro.title}</td>
                                {/* <td>{pro.category}</td> */}
                                <td>{pro.price} EGB</td>
                                <td>
                                    <Link to={`/admin/add-accessory/${pro.id}`}>
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
export default Allaccessories