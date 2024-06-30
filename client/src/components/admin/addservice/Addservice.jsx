import React, { useState } from "react";
import styles from "./Addservice.module.css"
// import Card from "../../ui/Card"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdPhotoCameraBack } from 'react-icons/md'
import { toast } from "react-toastify";
import Loader from '../../loader/Loader'
import { getservices, servicesdata } from '../../../redux/slice/serviceslice'
import axios from "axios";
const Addservice = () => {
    const { id } = useParams();
    const services = useSelector(servicesdata)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const serviceEdite = services.find((pro) => pro.id === id);
    const formkind = (id, f1, f2) => {
        if (id === "Add") {
            return f1;
        }
        return f2;
    }
    const initialservice = {
        title: "",
        serviceprice: "",
        description: "",
        serviceduration: ""
    }
    const [curentservice, setCurentservice] = useState(() => {
        const newstate = formkind(id, { ...initialservice }, serviceEdite)
        return newstate
    })
    const [image, setImage] = useState(curentservice?.ImageUrl);
    const [imagePreview, setImagePreview] = useState(curentservice?.ImageUrl);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(e.target.files[0])
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };
    const inputChange = (e) => {
        const { name, value } = e.target;
        setCurentservice({ ...curentservice, [name]: value });
    }
    const addservice = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", curentservice.title);
        formData.append("description", curentservice.description);
        formData.append("serviceprice", curentservice.serviceprice);
        formData.append("serviceduration", curentservice.serviceduration);
        if (curentservice?.title && curentservice?.description && curentservice?.serviceprice && curentservice?.serviceduration) {
            console.log(image);
            await axios.post(`${process.env.BASE_API_URL_HOST}/products/add-service`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((res) => {
                    toast.success(res.data.message, {
                        position: "top-right",
                    });
                    navigate('/admin/all-services')
                    dispatch(getservices())
                })
                .catch(err => toast.error(err.message))
        }
        else {
            toast.info('Please fill out all the fields!')
        }
    };
    const editeservice = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", id);
        formData.append("image", image);
        formData.append("title", curentservice.title);
        formData.append("description", curentservice.description);
        formData.append("serviceprice", curentservice.serviceprice);
        formData.append("serviceduration", curentservice.serviceduration);
        if (curentservice.title && curentservice.description && curentservice.serviceprice && curentservice.serviceduration) {
            await axios.post(`${process.env.BASE_API_URL_HOST}/products/edit-service`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((res) => {
                    toast.success(res.data.message, {
                        position: "top-right",
                    });
                    navigate('/admin/all-services')
                    dispatch(getservices())
                })
                .catch(err => toast.error(err.message))

        }
        else {
            toast.info('Please fill out all the fields!')
        }
    }

    return (
        <div className={styles.container}>
            <h2>{formkind(id, "Add Service", "Edite Service")}</h2>
            <div className={styles.formcard}>
                <form onSubmit={formkind(id, addservice, editeservice)}>
                    <label>Service Name:</label>
                    <input name="title" placeholder="Service name" type="text" value={curentservice?.title} onChange={(e) => inputChange(e)} />
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
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: "50%", maxHeight: "80%" }}
                            />
                        </div>
                    )}
                    <br />
                    <label>Service Price : </label>
                    <input name="serviceprice" placeholder="Service price" type="number" value={curentservice?.serviceprice} onChange={(e) => inputChange(e)} />
                    <br />
                    <label>Service duration : </label>
                    <input name="serviceduration" placeholder="Service duration" type="text" value={curentservice?.serviceduration} onChange={(e) => inputChange(e)} />
                    <br />
                    <label>Service Description : </label>
                    <textarea name="description" placeholder="Description" cols={10} rows={5} value={curentservice?.description} onChange={(e) => inputChange(e)}></textarea>
                    <button type="submit">{formkind(id, "Add Service", "Edite Service")}</button>
                </form>
            </div>

        </div>
    )
}
export default Addservice