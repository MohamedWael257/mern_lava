import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import keys from "../config/keys.js";
import passport from "passport";
const { clientURL } = keys.app
const { secret, tokenLife } = keys.jwt;


//Google
router.get(
    '/google',
    passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email'],
        accessType: 'offline',
        approvalPrompt: 'force'
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${clientURL}/login`,
        session: false
    }),
    (req, res) => {
        const payload = {
            email: req.user.email
        };

        // TODO find another way to send the token to frontend
        const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
        const jwtToken = `Bearer ${token}`;
        // return res.json({ status: "ok", data: token });
        res.redirect(`${clientURL}/login?token=${token}`);
        // res.send({ status: 'ok', data: token })
    }
);

//Facebook
router.get(
    '/facebook',
    passport.authenticate('facebook', {
        session: false,
        scope: ['public_profile', 'email']
    })
);

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: `${clientURL}/login`,
        session: false
    }),
    (req, res) => {
        const payload = {
            email: req.user.email
        };
        const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
        const jwtToken = `Bearer ${token}`;
        // console.log(token);
        // res.send({ status: 'ok', data: token })
        res.redirect(`${clientURL}/login?token=${token}`);
        // res.redirect(`${clientURL}/auth/success?token=${jwtToken}`);
    }
);

//Github

router.get(
    '/github',
    passport.authenticate('github', {
        session: false,
        scope: ['public_profile', 'email']
    })
);

router.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: `${clientURL}/login`,
        session: false
    }),
    (req, res) => {
        const payload = {
            email: req.user.email
        };
        const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
        const jwtToken = `Bearer ${token}`;
        // console.log(token);
        // res.send({ status: 'ok', data: token })
        res.redirect(`${clientURL}/login?token=${token}`);
        // res.redirect(`${clientURL}/auth/success?token=${jwtToken}`);
    }
);
export default router