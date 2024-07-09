import express from "express";
import { register, login, userData, forgot_password, getAllUsers, deleteUser, logout, getAllUsers_no_admin, getAdmin, update_user_data, verify, reset_password_id_token_get, reset_password_id_token_post, getAllUsers_admin } from "../controllers/auth.controller.js";
import { body, param } from "express-validator";
const router = express.Router();
import upload_avatar from "../multer/avatar.multer.js"
import Team from '../models/team.model.js'
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
        body("role").notEmpty().withMessage("Role is Required"),

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
router.get("/verify/:key/:token",
    [
        param("token").notEmpty().withMessage("Token is not Valid"),
        param("key").notEmpty().withMessage("Key is not Valid")

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
router.get('/getAllUsers-admin', getAllUsers_admin);
router.get('/getAdmin', getAdmin);
router.post('/deleteUser', deleteUser);
router.post('/logout', logout);
router.post('/update-user-data',
    upload_avatar.single("image"),
    // [
    //     body("id").notEmpty().withMessage("_id is not Valid"),
    //     body("email")
    //         .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
    //         .withMessage("email is not Valid"),
    //     body("phoneNumber").notEmpty().withMessage("phoneNumber is not Valid"),
    //     body("image").notEmpty().withMessage("Image is not Valid"),
    //     body("username").notEmpty().withMessage("username is not Valid"),
    //     body("fullName").notEmpty().withMessage("FullName is not Valid"),
    //     body("address").notEmpty().withMessage("address is not Valid"),
    //     body("gender").notEmpty().withMessage("gender is not Valid"),
    // ],
    update_user_data
);
router.get('/team-member', async (req, res) => {
    try {
        const Team_Members = await Team.find({});
        return res.status(200).json(Team_Members);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve products' });
    }
})
export default router