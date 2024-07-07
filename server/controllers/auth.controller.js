import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Chats from "../models/chats.model.js";
import Orders from '../models/orders.model.js';
import Booking from '../models/booking.model.js';
import keys from "../config/keys.js";
import { validationResult } from "express-validator";
const { FAILD, FAILD_CODE, SUCCESS, SUCCESS_CODE } = keys.codes
const { secret, tokenLife } = keys.jwt;
const { clientURL, apiURL } = keys.app
import { sendMail } from "../services/nodemailer.js"
import jwt from "../utils/jwt.js";
import fs from "fs"
export const register = async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;
    // const { username, email, phoneNumber, password ,role} = req.body;
    const imageName = req.file.filename;

    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "Can't Register please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const Check_User = await User.findOne({ email });
        if (Check_User) {
            return res.json({
                status: FAILD,
                status_Code: FAILD_CODE,
                message: "User Is already exist",
            });
        }
        await User.create({
            username,
            email,
            phoneNumber,
            password: encryptedPassword,
            photoimage: `${apiURL}/uploads/avatar/${imageName}`,
            // role:role.toUpperCase()
        });
        await sendMail(email, 'signup', null, { username: username })
        return res.json({
            status: SUCCESS,
            status_Code: SUCCESS_CODE,
            message: "User Created Successfully",
        });
    }
    catch (err) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: err.message,
        });
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "Can't login please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                status: FAILD,
                status_Code: FAILD_CODE,
                message: "Email is not exist !",
            });
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = await jwt.generateTokenAndSetCookie(user.email, res);
            // if (user.__v === 0) {
            //     const key = Math.floor(Math.random() * 1000000 + 1)
            //     const data = { key: key, token: token }
            //     await sendMail(email, 'verify', clientURL, data)
            //     return res.json({
            //         status: FAILD,
            //         status_Code: FAILD_CODE,
            //         data: null,
            //         message: "verfy your email first before login"
            //     });
            // }
            // else {
            return res.json({
                status: SUCCESS,
                status_Code: SUCCESS_CODE,
                data: token,
                message: "Signin successfully"
            });
            // }

        }
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "Password is wrong ! ",
            data: null
        });
    } catch (err) {
        // Error in serching handelar
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "Sorry Something went wrong please try again later !",
        });
    }
}
export const verify = async (req, res) => {
    const { token, key } = req.params
    // Check we have an id
    if (!token) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "Missing Token"
        });
    }

    // Step 1 -  jwt.verify the token from the URL
    let payload = null;
    try {
        payload = await jwt.verify_token(token);
        // res.json(payload)
    }
    catch (err) {
        return res.send(err);
    }
    try {
        // Step 2 - Find user with matching ID
        const user = await User.findOne({ email: payload.email }).exec();
        if (!user) {
            return res.json({
                status: FAILD,
                status_Code: FAILD_CODE,
                message: "User does not exists"
            });
        }
        //     // Step 3 - Update user verification status to true
        // res.json(user)
        user.__v = 1;
        await user.save();
        const keyencrypted = await bcrypt.hash(key, 10)
        await sendMail(user.email, 'verify', clientURL, { token: token, key: key })
        return res.redirect(`${clientURL}/login?key=${keyencrypted}&token=${token}`)

        // return res.send({
        // message: "Account Verified"
        // });
    }
    catch (err) {
        return res.send({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: err.message
            // message: "Sorry Something went wrong please try again later !"
        });
    }
}
export const userData = async (req, res) => {
    const { token } = req.body;
    const Errors = validationResult(req);
    // Body Validation Before Searching in the database to increase performance
    if (!Errors.isEmpty()) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "Can't Get User Data please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const user = await jwt.verify_token(token)
        console.log(user);
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }
        const useremail = user.email;
        User.findOne({ email: useremail })
            .then((data) => {
                return res.json({
                    status: SUCCESS,
                    status_Code: SUCCESS_CODE,
                    data: data
                })
            })
            .catch((error) => {
                return res.json({
                    status: FAILD,
                    status_Code: FAILD_CODE,
                    data: "User not founded",
                })
            });
    }
    catch (error) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            data: error.message,
        })
    }
};
export const forgot_password = async (req, res) => {
    const { email } = req.body;
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "You must enter an email address",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({
                status: FAILD,
                status_Code: FAILD_CODE,
                message: "Email is not exist !",
            });
        }
        const token = await jwt.generateTokenAndSetCookie(oldUser.email, res);
        const data = { id: oldUser._id, token: token }
        await sendMail(email, 'reset', clientURL, data)
        return res.json(
            {
                status: SUCCESS,
                status_Code: SUCCESS_CODE,
                message: "Check your Email messages",
            }
        )
    } catch (error) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: err.message,
        });
    }
};
export const reset_password_id_token_get = async (req, res) => {
    const { id, token } = req.params;
    try {
        const oldUser = await User.findOne({ _id: id });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const data = { id: id, token: token }
        await sendMail(oldUser.email, 'reset', clientURL, data)
        return res.send({ status: "Check your email message" });
    } catch (error) {
        return res.send({ status: error.message });
    }
};
export const reset_password_id_token_post = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    try {
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const verify = await jwt.verify_token(token)
        if (verify == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );
        await sendMail(oldUser.email, 'reset-confirmation')
        return res.send({ status: "Reset password successfully" });
    }
    catch (error) {
        // console.log(error);
        return res.send({ status: error.message });
    }
};
// export const getAllUsers = async (req, res) => {
//     try {
//         const allUser = await User.find({});
//         return res.send({ status: "ok", data: allUser });
//     } catch (error) {
//         console.log(error);
//     }
// };
// export const getAllUsers_no_admin = async (req, res) => {
//     try {
//         const allUser = await User.find({ "email": { $nin: ["admin@gmail.com"] } });
//         return res.send(allUser);
//     } catch (error) {
//         console.log(error);
//     }
// };
export const getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find({ "email": { $nin: ["admin@gmail.com"] } });
        // const allUser = await User.find({});
        return res.send(allUser);
    } catch (error) {
        console.log(error);
    }
};
export const getAllUsers_no_admin = async (req, res) => {
    try {
        const allUser = await User.find({ "role": { $nin: ["ROLE ADMIN"] } });
        return res.json({
            status: SUCCESS,
            status_Code: SUCCESS_CODE,
            data: allUser,
        });
    } catch (error) {
        console.log(error);
    }
};
export const getAdmin = async (req, res) => {
    try {
        const allUser = await User.find({ "email": { $in: ["admin@gmail.com"] } });
        return res.send({ status: "ok", data: allUser });
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (req, res) => {
    const { userid } = req.body;
    try {
        await User.deleteOne({ _id: userid })
        await Chats.deleteMany({ senderId: userid })
        await Chats.deleteMany({ receiverId: userid })
        await Orders.deleteMany({ uid: userid })
        await Booking.deleteMany({ uid: userid })
        return res.json({
            status: SUCCESS,
            status_Code: SUCCESS_CODE,
            message: "User Deleted Succeessfully !",
        });
    }
    catch (error) {
        console.log(error);
        return res.send(error.message)
    }
};

export const logout = async (req, res) => {
    const { uid } = req.body
    try {
        const user = await User.find({ id: uid });
        if (!user) {
            return res.json({
                status: FAILD,
                status_Code: FAILD_CODE,
                message: "Email is not exist !",
            });
        }
        // return res.cookie("jwt", "", { maxAge: 0 });
        return res.json({
            status: SUCCESS,
            status_Code: SUCCESS_CODE,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "Error in logout controller"
        });
    }
};
export const update_user_data = async (req, res) => {
    const { id, email, username, phoneNumber, address, fullname, gender, image } = req.body

    // const Errors = validationResult(req);
    //  // Body Validation Before Searching in the database to increase performance
    // if (!Errors.isEmpty()) {
    //     return res.json({
    //         status: FAILD,
    //         status_Code: FAILD_CODE,
    //         message: "some data filled Wrong ! check it and try again",
    //         data: Errors.array().map((arr) => arr.path),
    //     });
    // }

    try {
        const oldUser = await User.findOne({ _id: id });
        if (!oldUser) {
            return res.json({ error: "User is not Exists" });
        }
        const { ImageUrl } = oldUser;

        if (ImageUrl.length > 0 && !ImageUrl.includes("uploads/service.jpg")) {
            const Link = ImageUrl.split("http://localhost:5000/")[1];
            await fs.unlinkSync(`server/${Link}`);
        }
        // User.updateMany({email}, function (err, res) {
        //     console.log(err);
        // });
        if (image) {
            await User.updateOne(
                { _id: id },
                // { id, email, username, phoneNumber, address, fullname, gender },
                {
                    $set: {
                        email,
                        username,
                        phoneNumber,
                        address,
                        fullname,
                        gender,
                        photoimage: `${image}`,

                    },
                })
            return res.json({
                status: SUCCESS,
                status_Code: SUCCESS_CODE,
                message: "User Updated !",
            });
        }
        else {
            await User.updateOne(
                { _id: id },
                // { id, email, username, phoneNumber, address, fullname, gender },
                {
                    $set: {
                        email,
                        username,
                        phoneNumber,
                        address,
                        fullname,
                        gender,
                        photoimage: `${apiURL}/uploads/avatar/${req.file.filename}`,

                    },
                }
            )
            return res.json({
                status: SUCCESS,
                status_Code: SUCCESS_CODE,
                message: "User Updated !",
            });
        }


    }
    catch (error) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: error.message,
        });;
    }

}

