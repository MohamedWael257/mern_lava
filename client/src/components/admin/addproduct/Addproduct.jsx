import React, { useEffect, useState } from "react";
import styles from "./Addproduct.module.css"
// import Card from "../../ui/Card"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { productsdata, getProducts } from "../../../redux/slice/productsslice";
import { useDispatch, useSelector } from "react-redux";
import { MdPhotoCameraBack } from 'react-icons/md'
import { toast } from "react-toastify";
import Loader from '../../loader/Loader'
import axios from "axios";
import { v4 as uuid } from "uuid"
const Addproduct = () => {
    const { id } = useParams();
    const product = useSelector(productsdata);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const productEdite = product.find((pro) => pro.id === id);
    const formkind = (id, f1, f2) => {
        if (id === "Add") {
            return f1;
        }
        return f2;
    }
    const initialproduct = {
        title: "",
        description: "",
        price: "",
        category: "",
        brand: ""
    }
    const [curentproduct, setCurentproduct] = useState(() => {
        const newstate = formkind(id, { ...initialproduct }, productEdite)
        return newstate
    })
    const [image, setImage] = useState(curentproduct?.ImageUrl);
    const [imagePreview, setImagePreview] = useState(curentproduct?.ImageUrl);
    const handleImageChange = (e) => {
        setImage(e.target.files[0])
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            // setImage(null);
            setImagePreview(null);
        }
    };
    const inputChange = (e) => {
        const { name, value } = e.target;
        setCurentproduct({ ...curentproduct, [name]: value });
    }
    const addproduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", curentproduct.title);
        formData.append("description", curentproduct.description);
        formData.append("brand", curentproduct.brand);
        formData.append("category", curentproduct.category);
        formData.append("price", curentproduct.price);
        if (curentproduct.title && curentproduct.description && curentproduct.brand && curentproduct.category && curentproduct.price && image) {
            await axios.post(`${process.env.BASE_API_URL_HOST}/products/add-product`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((res) => {
                    toast.success(res.data.message, {
                        position: "top-right",
                    });
                    navigate('/admin/all-products')
                    dispatch(getProducts())
                })
                .catch(err => toast.error(err.message))
        }
        else {
            toast.info('Please fill out all the fields!')
        }
    };

    const editproduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", id);
        formData.append("image", image);
        formData.append("name", curentproduct.title);
        formData.append("description", curentproduct.description);
        formData.append("brand", curentproduct.brand);
        formData.append("category", curentproduct.category);
        formData.append("price", curentproduct.price);
        if (curentproduct.title && curentproduct.description && curentproduct.brand && curentproduct.category && curentproduct.price && image) {
            await axios.post(`${process.env.BASE_API_URL_HOST}/products/edit-product`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((res) => {
                    toast.success(res.data.message, {
                        position: "top-right",
                    });
                    navigate('/admin/all-products')
                    dispatch(getProducts())
                })
                .catch(err => toast.error(err.message))

        }
        else {
            toast.info('Please fill out all the fields!')
        }
    }
    return (
        <div className={styles.container}>
            <h2>{formkind(id, "Add product", "Edite product")}</h2>
            <div className={styles.formcard}>
                <form onSubmit={formkind(id, addproduct, editproduct)}>
                    <label>Product Name:</label>
                    <input name="title" placeholder="product title" type="text" value={curentproduct?.title} onChange={(e) => inputChange(e)} />
                    <br />
                    <label htmlFor="file" style={{ margin: '0 auto' }}>
                        Image Link:
                        <MdPhotoCameraBack color='black'
                            className="inline-block  translate-x-40 text-4xl"
                        // style={{ fontSize: '28px', display: 'inline-block' }}
                        />
                    </label>
                    <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleImageChange}
                    // onChange={(e) => setImage(e.target.value)}
                    />
                    {imagePreview && (
                        <div>
                            {/* <div className="absolute bottom-16 left-0 right-0 top-16 border-4 border-slate-400 border-dashed flex justify-center items-center bg-slate-200"> */}
                            {/* {uploading && <Loader />} */}
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: "50%", maxHeight: "80%" }}
                            />
                        </div>
                    )}
                    <br />
                    <label>Product Brand:</label>
                    <input name="brand" placeholder="product brand" type="text" value={curentproduct?.brand} onChange={(e) => inputChange(e)} />
                    <br />
                    <label>Product Price : </label>
                    <input name="price" placeholder="product price" type="number" value={curentproduct?.price} onChange={(e) => inputChange(e)} />
                    <br />
                    <label>Product Category : </label>
                    <input name="category" placeholder="product category" type="text" value={curentproduct?.category} onChange={(e) => inputChange(e)} />
                    <br />
                    <label>Product Description : </label>
                    <textarea name="description" placeholder="Description" cols={10} rows={5} value={curentproduct?.description} onChange={(e) => inputChange(e)}></textarea>
                    <button type="submit">{formkind(id, "Add product", "Edite product")}</button>
                </form>
            </div>

        </div>
    )
}
export default Addproduct