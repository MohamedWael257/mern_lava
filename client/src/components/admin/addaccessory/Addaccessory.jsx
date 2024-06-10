import React, { useEffect, useState } from "react";
import styles from "./Addproduct.module.css"
// import Card from "../../ui/Card"
import { useDispatch, useSelector } from "react-redux";
import { MdPhotoCameraBack } from 'react-icons/md'
import { toast } from "react-toastify";
import Loader from '../../loader/Loader'
import axios from "axios";
import { v4 as uuid } from "uuid"
import { accessoriesdata, getAccessories } from "../../../redux/slice/accessoriesslice";
import { useNavigate, useParams } from "react-router-dom";

const Addaccessory = () => {
    const { id } = useParams();
    const accessory = useSelector(accessoriesdata);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const accessoryEdite = accessory.find((pro) => pro.id === id);
    const formkind = (id, f1, f2) => {
        if (id === "Add") {
            return f1;
        }
        return f2;
    }
    const initialaccessory = {
        title: "",
        description: "",
        price: "",
        // color: [],

    }
    const [curentaccessory, setcurentaccessory] = useState(() => {
        const newstate = formkind(id, { ...initialaccessory }, accessoryEdite)
        return newstate
    })
    useEffect(() => {
        if (curentaccessory) {
            setImagePreview(curentaccessory?.Imageurl);
        }
    }, [curentaccessory?.Imageurl])
    // const category = [
    //     "All",
    //     ...new Set(accessory.map((accessorys) => accessorys.category)),
    // ];
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
        setcurentaccessory({ ...curentaccessory, [name]: value });
    }
    // await axios.post(`${process.env.BASE_API_URL_HOST}/auth/upload-image`, { image: image, uid: uid })
    const addaccessory = async (e) => {
        e.preventDefault();

        if (curentaccessory.title && curentaccessory.description && curentaccessory.price) {
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
                await axios.post(`${process.env.BASE_API_URL_HOST}/products/add-accessory`, {
                    title: curentaccessory.title,
                    description: curentaccessory.description,
                    price: curentaccessory.price,
                    ImageUrl: imageUrl,

                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                toast.success("accessory Added successful", {
                    position: "top-right",
                })
                navigate('/admin/all-accessories')
                dispatch(getAccessories())
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
    const editeaccessory = async (e) => {
        e.preventDefault();
        if (curentaccessory.title && curentaccessory.description && curentaccessory.price) {
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
                await axios.put(`${process.env.BASE_API_URL_HOST}/products/edit-accessory/${id}`, {
                    title: curentaccessory.title,
                    description: curentaccessory.description,
                    price: curentaccessory.price,
                    ImageUrl: imageUrl,

                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                toast.success("accessory Edited successful", {
                    position: "top-right",
                })
                navigate('/admin/all-accessories')
                dispatch(getaccessorys())
            }
            catch (error) {
                toast.error(error.message);
                setUploading(false);
            }
        }
    }

    return (
        <div className={styles.container}>
            <h2>{formkind(id, "Add accessory", "Edite accessory")}</h2>
            <div className={styles.formcard}>
                <form onSubmit={formkind(id, addaccessory, editeaccessory)}>
                    <label>Accessory Name:</label>
                    <input name="name" placeholder="accessory name" type="text" value={curentaccessory?.title} onChange={(e) => inputChange(e)} />
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

                    <label>Accessory Price : </label>
                    <input name="price" placeholder="accessory price" type="text" value={curentaccessory?.price} onChange={(e) => inputChange(e)} />
                    <br />

                    <label>Accessory Description : </label>
                    <textarea name="description" placeholder="Description" cols={10} rows={5} value={curentaccessory?.description} onChange={(e) => inputChange(e)}></textarea>
                    <button type="submit">{formkind(id, "Add accessory", "Edite accessory")}</button>
                </form>
            </div>

        </div>
    )
}
export default Addaccessory