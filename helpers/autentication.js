import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';

export function generateToken(role) {
    return jsonwebtoken.sign({ role }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' });
}