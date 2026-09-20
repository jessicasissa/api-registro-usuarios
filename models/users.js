import { ObjectId } from "mongodb";
import DatabaseClient from "../config/dbClient.js";

class usersModel {

    async create(user){
        const collectionUsers = DatabaseClient.db.collection('users');
        return await collectionUsers.insertOne(user);
    }

    async getAll(){
        const collectionUsers = DatabaseClient.db.collection('users');
        return await collectionUsers.find().toArray();
    }

    async getOne(id) {
        const collectionUsers = DatabaseClient.db.collection('users');
        return await collectionUsers.findOne({ _id: new ObjectId(id) });
    }

    async update(id, user) {
        const collectionUsers = DatabaseClient.db.collection('users');
        return await collectionUsers.updateOne({ _id: new ObjectId(id) }, { $set: user });
    }

    async delete(id) {
        const collectionUsers = DatabaseClient.db.collection('users');
        return await collectionUsers.deleteOne({ _id: new ObjectId(id) });
    }
}

export default new usersModel;