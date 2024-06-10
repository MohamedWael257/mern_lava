import React, { useEffect, useState } from "react";
import styles from "./Addproduct.module.css"
// import Card from "../../ui/Card"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { carsdata, getCars } from "../../../redux/slice/carsslice";
import { useDispatch, useSelector } from "react-redux";
import { MdPhotoCameraBack } from 'react-icons/md'
import { toast } from "react-toastify";
import Loader from '../../loader/Loader'
import axios from "axios";
import { v4 as uuid } from "uuid"
const Addcar = () => {
    const { id } = useParams();
    const car = useSelector(carsdata);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const carEdite = car.find((pro) => pro.id === id);
    const formkind = (id, f1, f2) => {
        if (id === "Add") {
            return f1;
        }
        return f2;
    }
    const initialcar = {
        title: "",
        description: "",
        bodyStyle: "",
        model: "",
        price: "",
        // color: [],
    }
    const [curentcar, setcurentcar] = useState(() => {
        const newstate = formkind(id, { ...initialcar }, carEdite)
        return newstate
    })
    useEffect(() => {
        if (curentcar) {
            setImagePreview(curentcar?.imageUrl);
        }
    }, [curentcar?.imageUrl])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setImagePreview(null);
        }
    };
    const inputChange = (e) => {
        const { name, value } = e.target;
        setcurentcar({ ...curentcar, [name]: value });
    }
    const addcar = async (e) => {
        e.preventDefault();

        if (curentcar.title && curentcar.description && curentcar.bodyStyle && curentcar.model && curentcar.price) {
            try {
                if (image) {
                    const uid = uuid()
                    setUploading(true)
                    await axios.post(`${process.env.BASE_API_URL_HOST}/auth/upload-image`, { image: image, uid: uid })
                        .then((res) => {
                            // console.log(res);
                            setUploading(false)
                        })
                        .catch((err) => {
                            toast.error(err.message)
                            setUploading(false)
                        })
                    await axios.post(`${process.env.BASE_API_URL_HOST}/auth/get-image`, { uid: uid })
                        .then((res) => {
                            // console.log(res)
                            setImageUrl(res.data.data.image)
                            setUploading(false)
                            setImage(null);
                            setImagePreview(null);
                        })
                        .catch((err) => {
                            toast.error(err.message)
                            setUploading(false)
                        })
                }
                await axios.post(`${process.env.BASE_API_URL_HOST}/products/add-car`, {
                    name: curentcar.title,
                    description: curentcar.description,
                    bodyStyle: curentcar.bodyStyle,
                    model: curentcar.model,
                    price: curentcar.price,
                    ImageUrl: imageUrl,

                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                toast.success("car Added successful", {
                    position: "top-right",
                })
                navigate('/admin/all-cars')
                dispatch(getCars())
            }
            catch (error) {
                toast.error(error.message);
                setUploading(false)
            }
        }
        else {
            toast.info('Please fill out all the fields!')
        }
    };
    const editecar = async (e) => {
        e.preventDefault();
        if (curentcar.title && curentcar.description && curentcar.bodyStyle && curentcar.model && curentcar.price) {
            try {
                if (image) {
                    const uid = uuid()
                    setUploading(true)
                    await axios.post(`${process.env.BASE_API_URL_HOST}/auth/upload-image`, { image: image, uid: uid })
                        .then((res) => {
                            // console.log(res);
                            setUploading(false)
                        })
                        .catch((err) => {
                            toast.error(err.message)
                            setUploading(false)
                        })
                    await axios.post(`${process.env.BASE_API_URL_HOST}/auth/get-image`, { uid: uid })
                        .then((res) => {
                            // console.log(res)
                            setImageUrl(res.data.data.image)
                            setUploading(false)
                            setImage(null);
                            setImagePreview(null);
                        })
                        .catch((err) => {
                            toast.error(err.message)
                            setUploading(false)
                        })
                }
                await axios.put(`${process.env.BASE_API_URL_HOST}/products/edit-car/${id}`, {
                    name: curentcar.title,
                    description: curentcar.description,
                    bodyStyle: curentcar.bodyStyle,
                    model: curentcar.model,
                    price: curentcar.price,
                    ImageUrl: imageUrl,

                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                toast.success("car Edited successful", {
                    position: "top-right",
                })
                navigate('/admin/all-cars')
                dispatch(getcars())
            }
            catch (error) {
                toast.error(error.message);
                setUploading(false);
            }
        }
    }

    return (
        <div className={styles.container}>
            <h2>{formkind(id, "Add car", "Edite car")}</h2>
            <div className={styles.formcard}>
                <form onSubmit={formkind(id, addcar, editecar)}>
                    <label>Car Name:</label>
                    <input name="name" placeholder="car name" type="text" value={curentcar?.title} onChange={(e) => inputChange(e)} />
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
                            {uploading && <Loader />}
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: "50%", maxHeight: "80%" }}
                            />
                        </div>
                    )}
                    <br />
                    <label>Car BodyStyle:</label>
                    <input name="bodyStyle" placeholder="car bodyStyle" type="text" value={curentcar?.bodyStyle} onChange={(e) => inputChange(e)} />
                    <br />
                    <label>Car Price : </label>
                    <input name="price" placeholder="car price" type="text" value={curentcar?.price} onChange={(e) => inputChange(e)} />
                    <br />
                    <label>Car Model : </label>
                    <input name="model" placeholder="car model" type="text" value={curentcar?.model} onChange={(e) => inputChange(e)} />
                    <br />
                    <label>Car Description : </label>
                    <textarea name="description" placeholder="Description" cols={10} rows={5} value={curentcar?.description} onChange={(e) => inputChange(e)}></textarea>
                    <button type="submit">{formkind(id, "Add car", "Edite car")}</button>
                </form>
            </div>

        </div>
    )
}
export default Addcar