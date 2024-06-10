import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Chats from "../models/chats.model.js";
import Orders from '../models/orders.model.js';
import Booking from '../models/booking.model.js';
import jwt from 'jsonwebtoken';
import keys from "../config/keys.js";
import { validationResult } from "express-validator";
const { FAILD, FAILD_CODE, SUCCESS, SUCCESS_CODE } = keys.codes
const { secret, tokenLife } = keys.jwt;
const { clientURL } = keys.app
import { sendMail } from "../services/nodemailer.js"

export const register = async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;
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
            photoimage: `http://localhost:5000/uploads/avatar${imageName}`
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
            // generateTokenAndSetCookie(user._id, res);

            const token = jwt.sign({ email: user.email }, secret, {
                expiresIn: tokenLife,
            });

            // if (user.__v === 0) {
            //     const key = Math.floor(Math.random() * 1000000 + 1)
            //     // // const url = `http://localhost:5000/api/auth/jwt.verify/${token}`
            //     const url = `${clientURL}/otp?key=${key}&token=${token}`
            //     //     const transporter = nodemailer.createTransport({
            //     //         service: 'gmail',
            //     //         host: host,
            //     //         port: port,
            //     //         secure: false,
            //     //         // pool: true,
            //     //         auth: {
            //     //             // adarsh438tcsckandivali
            //     //             user: mail,
            //     //             pass: pass,
            //     //         },
            //     //     });
            //     //     const mailOptions = {
            //     //         to: email,
            //     //         subject: 'jwt.verify Account',
            //     //         html: `Click <a href = '${url}'>here</a> to confirm your email. with your key ${key}`
            //     //         // html: `Click <a href = '${url}'>here</a> to confirm your email. with your key `
            //     //     };
            //     //     transporter.sendMail(mailOptions, function (error, info) {
            //     //         if (error) {
            //     //            return res.json(error);
            //     //         }
            //     //         else {
            //     //            return res.json(`Email sent: ${email}` + info.response);
            //     //         }
            //     //     });
            //     //     // res.redirect(`${url}`)
            //     const data = { key: key, token: token }
            //     await sendMail(email, 'verify', clientURL, data)
            //     return res.json({ message: "verfy your email first before login" });
            // }
            // else {
            return res.json({
                status: SUCCESS,
                status_Code: SUCCESS_CODE,
                data: token,
            });
            // }

        }
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "Password is wrong ! ",
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
    const { token } = req.params
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
        payload = jwt.verify(token, secret);
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
        return res.redirect(`${clientURL}/login?token=${token}`)
        // return res.send({
        //     message: "Account Verified"
        // });
    }
    catch (err) {
        return res.send({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "Sorry Something went wrong please try again later !"
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
        const user = jwt.verify(token, secret, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
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
        // const buffer = crypto.randomBytes(48);
        // const token = buffer.toString('hex');
        // const secret = secret + oldUser.password;
        const token = jwt.sign({ email: oldUser.email }, secret, {
            expiresIn: tokenLife
        });
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
        // const verify = jwt.jwt.verify(token, secret);
        // res.render("index", { email: jwt.verify.email, status: "Not Verified" });
    } catch (error) {
        // console.log(error);
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
        // const secrett = secret + oldUser.password;
        const verify = jwt.verify(token, secret, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });;
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
        // res.render("index", { status: "verified" });
        return res.send({ status: "Reset password successfully" });
        // res.render("index", { email: jwt.verify.email, status: "verified" });
    }
    catch (error) {
        // console.log(error);
        return res.send({ status: error.message });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find({});
        return res.send({ status: "ok", data: allUser });
    } catch (error) {
        console.log(error);
    }
};
export const getAllUsers_no_admin = async (req, res) => {
    try {
        const allUser = await User.find({ "email": { $nin: ["admin@gmail.com"] } });
        return res.send({ status: "ok", data: allUser });
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
        User.deleteOne({ _id: userid }, function (err, res) {
            console.log(err);
        });
        Chats.deleteMany({ senderId: userid }, function (err, res) {
            console.log(err);
        });
        Chats.deleteMany({ receiverId: userid }, function (err, res) {
            console.log(err);
        });
        Orders.deleteMany({ uid: userid }, function (err, res) {
            console.log(err);
        });
        Booking.deleteMany({ uid: userid }, function (err, res) {
            console.log(err);
        });
        return res.send({ status: "Ok", data: "Deleted" });
    } catch (error) {
        console.log(error);
        return res.send(error.message)
    }
};

export const logout = (req, res) => {
    try {
        // return res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const update_user_data = async (req, res) => {
    const { uid, email, username, phoneNumber, address, fullname, gender } = req.body
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
        const oldUser = await User.findOne({ _id: uid });
        if (!oldUser) {
            return res.json({ error: "User is not Exists" });
        }
        // User.updateMany({email}, function (err, res) {
        //     console.log(err);
        // });
        await oldUser.updateOne(
            { email, username, phoneNumber, address, fullname, gender },
            {
                $set: {
                    username,
                    phoneNumber,
                    address,
                    fullname,
                    gender,
                },
            }
        )
        return res.json({
            status: SUCCESS,
            status_Code: SUCCESS_CODE,
            message: "User Updated !",
        });
    }
    catch (error) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "User not founded",
        });;
    }

}

