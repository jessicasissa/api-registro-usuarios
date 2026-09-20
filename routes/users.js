import express from 'express';

import userController from '../controllers/users.js';
import { requireRole, verifyToken } from '../helpers/autentication.js';

const publicRoute = express.Router();
publicRoute.post('/register', userController.register);
publicRoute.post('/login', userController.login);

const protectedRoute = express.Router();
protectedRoute.use(verifyToken);

protectedRoute.post('/', requireRole(['admin']), userController.create);
protectedRoute.get('/', requireRole(['admin', 'operator']), userController.getAll);
protectedRoute.get('/:id', requireRole(['admin', 'operator', 'client']), userController.getOne);
protectedRoute.put('/:id', requireRole(['admin', 'operator']), userController.update);
protectedRoute.delete('/:id', requireRole(['admin']), userController.delete);

export { publicRoute, protectedRoute };