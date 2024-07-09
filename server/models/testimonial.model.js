import mongoose from "mongoose";
const TestimonialsScehma = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    photoimage: { type: String, required: true },
    date: { type: String }
});

const Testimonial = mongoose.model("testimonials", TestimonialsScehma);
export default Testimonial