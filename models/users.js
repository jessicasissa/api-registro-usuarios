import User from '../schemas/users.js';
import mongoose from "mongoose";

// TODO: decidir se update altera senha (e como tratar senha vazia)
// TODO: implementar pre('save') com bcrypt + isModified

class usersModel {

    async create(user){
        return await User.create(user);
    }

    async getAll(){
        return await User.find();
    }

    async getOne(id) {
        return await User.findById(id);
    }

    async update(id, user) {
        // dessa forma roda as validações de novo ao atualizar, 
        // findByIdAndUpdate não faz isso
        let selectedUser = await User.findById(id);
        selectedUser.name = user.name;
        selectedUser.email = user.email;
        selectedUser.password = user.password;
        selectedUser.role = user.role;

        return selectedUser.save();
    }

    async delete(id) {
        return await User.findOneAndDelete(id);
    }
}

export default new usersModel;