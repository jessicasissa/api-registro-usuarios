import User from '../schemas/users.js';
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

class usersModel {

    async create(user){
        return await User.create(user);
    }

    async getAll(){
        return await User.find();
    }
    
    async getCredentials(filter) {
        return await User.findOne(filter).select('+password');
    }

    async getOneById(id) {
        return await User.findById(id);
    }
    
    async getOne(filter) {
        return await User.findOne(filter);
    }

    async update(id, user) {
        // dessa forma roda as validações de novo ao atualizar, 
        // findByIdAndUpdate não faz isso
        let selectedUser = await User.findById(id);

        selectedUser.name = user.name;
        selectedUser.email = user.email;
        selectedUser.role = user.role;
        
        if (user.password && user.password.length > 0) {
            selectedUser.password = await bcrypt.hash(user.password, 10);
        }        

        return selectedUser.save();
    }

    async delete(id) {
        return await User.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }
}

export default new usersModel;