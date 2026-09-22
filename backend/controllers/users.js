import { generateToken } from '../helpers/autentication.js';
import usersModel from '../models/users.js';
import bcrypt from 'bcrypt';

class userController {
    constructor() {}

    async register(req, res){
        try {
            const { name, email, password } = req.body;
            
            if (await usersModel.getOne({ email })){
                return res.status(400).json({ error: 'Erro ao cadastrar usuário.' });
            }

            const encryptedPass = await bcrypt.hash(password, 10);

            const data = await usersModel.create({
                name,
                email,
                password: encryptedPass,
                role: 'client'
            });

            res.status(201).json(data);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await usersModel.getCredentials({ email });

            if(!user) {
                return res.status(400).json({ error: 'Erro ao autenticar usuário.' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Erro ao autenticar usuário.' });
            }

            const token = generateToken(user.id, user.role);
            return res.status(200).json({ message: 'Usuário autenticado!', token });

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async create(req, res){
        try {
            const email = req.body.email;

            if (await usersModel.getOne({ email })){
                return res.status(400).json({ error: 'Erro ao cadastrar usuário.' });
            }

            const encryptedPass = await bcrypt.hash(req.body.password, 10);
            const data = await usersModel.create({...req.body, password: encryptedPass });

            res.status(201).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async update(req, res){
        try {
            const { id } = req.params;

            if (req.user.role === 'client' && req.user.id !== req.params.id) {
                return res.status(403).json({ error: 'Acesso negado.' });
            }

            const updateData = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            };

            if (req.user.role === 'admin') {
                updateData.role = req.body.role;
            }

            const data = await usersModel.update(id, updateData);
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

            if (req.user.role === 'client' && req.user.id !== req.params.id) {
                return res.status(403).json({ error: 'Acesso negado.' });
            }
            
            const data = await usersModel.getOneById(id);

            if (!data) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    
}

export default new userController;