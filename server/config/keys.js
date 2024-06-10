export default {
    app: {
        name: 'Mern-Lava',
        apiURL: process.env.BASE_API_URL,
        clientURL: process.env.CLIENT_URL,
        // dd: window.location.host.includes('localhost') ? process.env.REACT_CLIENT_URL : process.env.FLUTTER_CLIENT_URL
        // appname: [window.location.hostname]
    },
    codes: {
        FAILD: "Faild",
        FAILD_CODE: 404,
        UNAUTHORIZED: "UNAUTHORIZED",
        UNAUTHORIZED_CODE: 401,
        SUCCESS: "Success",
        SUCCESS_CODE: 200,
    },
    port: process.env.PORT,
    database: {
        url: process.env.MONGO_URI
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        tokenLife: '15d'
    },
    nodemailer: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        mail: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
        UVTS: process.env.USER_VERIFICATION_TOKEN_SECRET
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    facebook: {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    },
    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    }
};
