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
            minlength: [8, "Senha precisa ter no mínimo 8 caracteres"],
            required: [true, "Senha é obrigatório"],
            select: false,
        },
        "role": {
            type: String,
            enum: ['admin', 'worker', 'client'],
            required: true
        }
    }, { timestamps: true }
);

export default mongoose.model('users', userSchema);