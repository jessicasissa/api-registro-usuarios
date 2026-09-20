import usersModel from '../models/users.js';
import bcrypt from 'bcrypt';

class userController {
    constructor() {}

    async register(req, res){
        try {
            const { name, email, password, role } = req.body;
            
            if (await usersModel.getOne({ email })){
                return res.status(400).json({ error: 'Erro ao cadastrar usuário.' });
            }

            const encryptedPass = await bcrypt.hash(password, 10);

            const data = await usersModel.create({
                name,
                email,
                password: encryptedPass,
                role
            });

            res.status(201).json(data);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async create(req, res){
        try {
            const data = await usersModel.create(req.body);
            res.status(201).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async update(req, res){
        try {
            const { id } = req.params;
            const data = await usersModel.update(id, req.body);
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async delete(req, res){
        try {
            const { id } = req.params;
            const data = await usersModel.delete(id);
            res.status(204).send();
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async getAll(req, res){
        try {
            const data = await usersModel.getAll();
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async getOne(req, res){
        try {
            const { id } = req.params;
            const data = await usersModel.getOneById(id);
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    
}

export default new userController;