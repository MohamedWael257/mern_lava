// import files
import express from "express";
import cors from "cors";
import { app, server } from './socket/socket.js';
import "dotenv/config.js"
import cookieParser from "cookie-parser";
import passport from './config/passport.js';
import keys from './config/keys.js';

//Routes files
import authRoutes from "./routes/auth.routes.js";
import passportRoutes from "./routes/passport.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import productsRoutes from "./routes/products.routes.js";
import storeRoutes from "./routes/store.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import testimonialRoutes from './routes/testimonial.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import recommendationsRoutes from './routes/recommendations.routes.js';
import rateRoutes from './routes/rate.routes.js';
import wishListRoutes from './routes/wishList.routes.js';

//File System
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ___dirname = path.resolve();

// make a conection to DataBase
import { ConnectToMongoDB } from "./db/ConnectToMongoDB.js";

// middleware
passport(app);
app.use(cookieParser());
app.use(express.json());
app.use(express.json({ limit: "25mb" }));
app.use(cors())
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//Define The routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use('/api/passport', passportRoutes)
app.use("/api/booking", bookingRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/recommendations", recommendationsRoutes);
app.use("/api/rate", rateRoutes);
app.use("/api/wishList", wishListRoutes);
app.use(express.static(path.join(___dirname, '/client/dist')));
app.get("*", (req, res) => {
    res.sendFile(path.join(___dirname, 'client', 'dist', 'index.html'));
})

// Server
const port = keys.port
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    ConnectToMongoDB();
});
