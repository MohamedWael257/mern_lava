export function resetEmail(host, data) {
    const message = {
        subject: 'Reset Password',
        text:
            `${'You are receiving this because you have requested to reset your password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://'
            }${host}/reset-password/${data.id}/${data.token}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    return message;
}

export function confirmResetPasswordEmail() {
    const message = {
        subject: 'Password Changed',
        text:
            `You are receiving this email because you changed your password. \n\n` +
            `If you did not request this change, please contact us immediately.`
    };

    return message;
}

export function signupEmail(name) {
    const message = {
        subject: 'Account Registration',
        text: `Hi ${name.username}! Thank you for creating an account with us!.`
    };

    return message;
}

export function verifyEmail(host, data) {
    const message = {
        subject: 'Account Verification',
        text: `${'You are receiving this because you have to verify your email for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://'
            }${host}/otp?key=${data.key}&token=${data.token}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    return message;
}

export function contactEmail() {
    const message = {
        subject: 'Contact Us',
        text: `We received your message! Our team will contact you soon. \n\n`
    };

    return message;
}

export function orderConfirmationEmail(order) {
    const message = {
        subject: `Order Confirmation ${order._id}`,
        text:
            `Hi ${order.user}! Thank you for your order!. \n\n` +
            `We've received your order and will contact you as soon as your package is shipped. \n\n`
    };

    return message;
}

export function bookingConfirmationEmail(booking) {
    const message = {
        subject: `Booking Confirmation ${booking._id}`,
        text:
            `Hi ${booking.user}! Thank you for your booking!. \n\n` +
            `We've received your booking and will contact you as soon as your package is shipped. \n\n`
    };

    return message;
}
