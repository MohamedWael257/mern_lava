import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import styles from "./Allusers.module.css"
import { FaUserCircle } from 'react-icons/fa';
import { getUsers, usersdata } from '../../../redux/slice/userslice';
import { filterByRole, filterproduct } from '../../../redux/slice/filterslice';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa"
import { FiTrash } from "react-icons/fi";
import { MdMobileScreenShare } from "react-icons/md";
import { toast } from 'react-toastify';
import Loader from '../../loader/Loader'
const Allusers = () => {
    const { currentUser } = useContext(AuthContext)
    const users = useSelector(usersdata);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const filteredusers = useSelector(filterproduct)
    const currentusers = filteredusers.length === 0 ? users : filteredusers;
    const filterbyrole = (role) => {
        console.log(role)
        dispatch(filterByRole({ user: users, role: role }));
    }
    const roles = [
        'All',
        ...new Set(users.map((user) => user.role)),
    ];
    const deleteaccount = async (uid) => {
        // setLoading(true)
        // await axios.post(`${process.env.BASE_API_URL_HOST}/auth/deleteUser`, { userid: uid })
        //     .then((res) => {
        //         toast.success(res.data.message)
        //         setLoading(false)
        //         dispatch(getUsers())
        //     })
        //     .catch(err => {
        //         toast.error(err.message)
        //         setLoading(false)

        //     })
        toast.info(uid)
    }
    return (
        <>
            {loading && <Loader />}
            <section className={styles.container}>
                <h2>All Users</h2>
                {/* <h2>Roles</h2> */}
                <select aria-label="Default select example" className={styles.category}
                    onChange={(e) => {
                        filterbyrole(e.target.value);
                    }}>

                    {roles.map((role, index) => {
                        return (
                            <option key={index} value={role} type='button' className={`${styles.catbtn}`}  >
                                {role}
                            </option>
                        )
                    })}
                </select>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {/* <th>s/n</th> */}
                            <th>Image</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Operation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentusers.map((user, index) => {
                            return (
                                <tr key={index}>
                                    {/* <td>{index}</td> */}
                                    <td className="p-4">
                                        <img className={styles.imgg} src={user.photoimage} />
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.email}</td>
                                    <td><p className={styles.active}>Active</p></td>
                                    {user.role === "ROLE MEMBER" ?
                                        <td >
                                            <button className='mt-2 mr-2'><MdMobileScreenShare size={25} color='green' /></button>
                                            <button className='mt-2 mr-2'><FaEdit size={25} color='#0b3dbc' /></button>
                                            <button onClick={() => deleteaccount(user.id)} className='mt-2 mr-2'><FiTrash size={25} color='red' /></button>

                                        </td>
                                        : <td></td>
                                    }
                                    {/* <button onClick={() => deleteaccount(user._id)} className='mt-2 mr-2'><FiTrash size={25} color='red' /></button> */}
                                    <td >
                                        <button className={styles.login}>login</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default Allusers