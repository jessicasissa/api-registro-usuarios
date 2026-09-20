import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';

export function generateToken(id, role) {
    return jsonwebtoken.sign({ id: id, role }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' });
}

export function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Sem autorização.' });
    }
    
    try {
        const dataToken = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = dataToken;
        next();
    } catch (e) {
        res.status(401).json({ error: 'Credencial inválida.' });
    }
}

export function requireRole(roles) {
    return function checkRole(req, res, next) {
        if (!req.user) {
            return res.status(401).json({ error: 'Sem autorização.' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Acesso negado.' });
        }

        next();
    }
}