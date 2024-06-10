// import Files
import jwt from "jsonwebtoken";
import keys from "../config/keys.js"
const { secret, tokenLife } = keys.jwt;
const { UNAUTHORIZED, UNAUTHORIZED_CODE } = keys.codes
// Genetate token
export const Genetate_Token = async (userEmail, res) => {
    const token = jwt.sign({ email: userEmail }, secret, {
        expiresIn: tokenLife,
    });
    return res.cookie("TOKEN", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: `${process.env.NODE_ENV}` !== "development",
    });
    // return token;
};

// Verify token
export const Verify_Token = async (req, res, next) => {
    // const token = req.headers["Authorization"] || req.headers["authorization"];
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJhYmNmMTNjZGZkMTZjMDBmNmIyNjAiLCJSb2xlIjoiQURNSU4iLCJpYXQiOjE3MTQwNzY5MTN9.0hZ0YbnhKVTpi5tyDGEjUbj8cqxNRteY8mE5gGZOydE"
    try {
        if (!token) {
            // token not in headers
            return res.json({
                Status: UNAUTHORIZED,
                Status_Code: UNAUTHORIZED_CODE,
                message: "Token is Required !",
            });
        }
        const verifyed_user = jwt.verify(token, secret);
        req.verifyed_user = verifyed_user;
        next();
    } catch (err) {
        // Error in token handelar
        return res.json({
            Status: UNAUTHORIZED,
            Status_Code: UNAUTHORIZED_CODE,
            message: "Unauthorized. Token is not valid !",
        });
    }
};

