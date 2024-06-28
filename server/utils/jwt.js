// import Files
import jwt from "jsonwebtoken";
import keys from "../config/keys.js"
const { secret, tokenLife } = keys.jwt;
const { UNAUTHORIZED, UNAUTHORIZED_CODE } = keys.codes
// Genetate token
const generateTokenAndSetCookie = async (userEmail, res) => {
    const token = jwt.sign({ email: userEmail }, secret, {
        expiresIn: tokenLife,
    });
    return token;
    // return res.cookie("TOKEN", token, {
    // path: "/",
    // maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    // httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    // sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    // secure: `${process.env.NODE_ENV}` !== "development",
    // });
};

// Verify token
// const Verify_Token = async (req, res, next) => {
//     // const token = req.headers["Authorization"] || req.headers["authorization"];
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJhYmNmMTNjZGZkMTZjMDBmNmIyNjAiLCJSb2xlIjoiQURNSU4iLCJpYXQiOjE3MTQwNzY5MTN9.0hZ0YbnhKVTpi5tyDGEjUbj8cqxNRteY8mE5gGZOydE"
//     if (!token) {
//         // token not in headers
//         return res.json({
//             Status: UNAUTHORIZED,
//             Status_Code: UNAUTHORIZED_CODE,
//             message: "token is Required !",
//         });
//     }

//     try {
//         const verifyed_user = await jwt.verify(token, secret);
//         req.verifyed_user = verifyed_user;
//         next();
//     } catch (err) {
//         // Error in token handelar
//         return res.json({
//             Status: UNAUTHORIZED,
//             Status_Code: UNAUTHORIZED_CODE,
//             message: "Unauthorized. token is not valid !",
//         });
//     }
// };
const verify_token = async (token) => {
    // const token = req.headers["Authorization"] || req.headers["authorization"];
    const payload = jwt.verify(token, secret, (err, res) => {
        if (err) {
            return "token expired";
        }
        return res;
    });
    return payload

};
export default {
    generateTokenAndSetCookie,
    verify_token,
};
