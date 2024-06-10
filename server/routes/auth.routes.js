import express from "express";
import { register, login, userData, forgot_password, getAllUsers, deleteUser, logout, getAllUsers_no_admin, getAdmin, update_user_data, verify, reset_password_id_token_get, reset_password_id_token_post } from "../controllers/auth.controller.js";
import { body, param } from "express-validator";
const router = express.Router();
import upload_avatar from "../multer/avatar.multer.js"
// router.get("*", async (req, res) => {
//     try {
//         const clientURL = req.headers.host
//         if (clientURL.includes('localhost')) {
//             console.log('react')
//         }
//         else {
//             console.log('fluter')
//         }
//     } catch (error) {
//         console.log(error.message);
//     }

// });
// router.post("/upload-image", upload_avatar.single("image"), async (req, res) => {
//     console.log(req.body);
//     const imageName = req.file.filename;

//     try {
//         await Images.create({ image: imageName });
//         res.json({ status: "ok" });
//     } catch (error) {
//         res.json({ status: error });
//     }
// });
router.post("/register",
    upload_avatar.single("image"),
    [
        body("username").notEmpty().withMessage("Username is Required"),
        body("phoneNumber").notEmpty().withMessage("phoneNumber is Required"),
        body("email")
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
            .withMessage("Email is not Valid"),
        body("password")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
            .withMessage("Password is not Valid"),
    ],
    register
);
router.post("/login",
    [
        body("email")
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
            .withMessage("Email is not Valid"),
        body("password")
            .notEmpty()
            // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
            .withMessage("Password is not Valid"),
    ],
    login
);
router.post("/userData",
    [
        body("token").notEmpty().withMessage("Token is not Valid"),
    ],
    userData
);
router.get("/verify/:token",
    [
        param("token").notEmpty().withMessage("Token is not Valid")
    ],
    verify
);
router.post("/forgot-password",
    [
        body("email")
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
            .withMessage("Email is not Valid"),
        body("email").notEmpty().withMessage("You Must Enter Email")
    ],
    forgot_password
);
router.get("/reset-password/:id/:token",
    [
        param("id").notEmpty().withMessage("id is not Valid"),
        param("token").notEmpty().withMessage("Token is not Valid"),
    ],
    reset_password_id_token_get
);
router.post("/reset-password/:id/:token",
    [
        param("_id").notEmpty().withMessage("_id is not Valid"),
        param("Token").notEmpty().withMessage("Token is not Valid"),
        body("password")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
            .withMessage("Password is not Valid"),
    ],
    reset_password_id_token_post
);
router.get('/getAllUsers', getAllUsers);
router.get('/getAllUsers-no-admin', getAllUsers_no_admin);
router.get('/getAdmin', getAdmin);
router.post('/deleteUser', deleteUser);
router.get('/logout', logout);
router.post('/update-user-data',
    // [
    //     body("uid").notEmpty().withMessage("_id is not Valid"),
    //     body("email")
    //         .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
    //         .withMessage("email is not Valid"),
    //     body("phoneNumber").notEmpty().withMessage("phoneNumber is not Valid"),
    //     body("username").notEmpty().withMessage("username is not Valid"),
    //     body("FullName").notEmpty().withMessage("FullName is not Valid"),
    //     body("address").notEmpty().withMessage("address is not Valid"),
    //     body("gender").notEmpty().withMessage("gender is not Valid"),
    // ],
    update_user_data
);

export default router