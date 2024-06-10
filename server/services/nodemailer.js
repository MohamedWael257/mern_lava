import keys from "../config/keys.js";
const { host, port, mail, pass } = keys.nodemailer;
const { clientURL } = keys.app
import nodemailer from "nodemailer";
import { resetEmail, confirmResetPasswordEmail, signupEmail, contactEmail, orderConfirmationEmail, bookingConfirmationEmail, verifyEmail } from '../config/template.js';

export const sendMail = async (email, type, hostlink, data) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: host,
            port: port,
            secure: false,
            auth: {
                user: mail,
                pass: pass,
            },
        });
        const message = prepareTemplate(type, hostlink, data);

        const mailOptions = {
            to: email,
            subject: message.subject,
            text: message.text
            // html: `Click <a href = '${url}'>here</a> to confirm your email. with your key `
        };
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        return error
    }
    // res.redirect(`${url}`)
}
const prepareTemplate = (type, hostlink, data) => {
    let message;

    switch (type) {
        case 'reset':
            message = resetEmail(hostlink, data);
            break;

        case 'reset-confirmation':
            message = confirmResetPasswordEmail();
            break;

        case 'signup':
            message = signupEmail(data);
            break;

        case 'verify':
            message = verifyEmail(host, data);
            break;

        case 'contact':
            message = contactEmail();
            break;

        case 'order-confirmation':
            message = orderConfirmationEmail(data);
            break;

        case 'booking-confirmation':
            message = bookingConfirmationEmail(data);
            break;

        default:
            message = '';
    }

    return message;
};
