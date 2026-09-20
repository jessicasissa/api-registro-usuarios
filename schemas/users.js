import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    // TODO adicionar validação dos campos - min, max, hash etc.
    {
        "name": {
            type: String,
            trim: true,
            required: true
        },
        "email": {
            type: String,
            required: true
        },
        "password": {
            type: String,
            required: true
        },
        "role": {
            type: String,
            enum: ['admin', 'worker', 'client'],
            required: true
        }
    }, { timestamps: true }
);

export default mongoose.model('users', userSchema);