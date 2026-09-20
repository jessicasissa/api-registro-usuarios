import express from 'express';

const route = express.Router();
import userController from '../controllers/users.js';

route.post('/register', userController.register);
route.post('/login', userController.login);
route.post('/', userController.create);
route.get('/', userController.getAll);
route.get('/:id', userController.getOne);
route.put('/:id', userController.update);
route.delete('/:id', userController.delete);

export default route;