import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './schemas/users.js';

async function seed() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Conectado ao banco.');

        await User.deleteMany({});
        console.log('Usuários antigos removidos.');

        const passwordHash = await bcrypt.hash('senha123', 10);

        await User.create([
            {
                name: 'Admin Teste',
                email: 'admin@teste.com',
                password: passwordHash,
                role: 'admin'
            },
            {
                name: 'Operator Teste',
                email: 'operator@teste.com',
                password: passwordHash,
                role: 'operator'
            },
            {
                name: 'Client Teste',
                email: 'client@teste.com',
                password: passwordHash,
                role: 'client'
            }
        ]);

        console.log('Seed concluído!');
        console.log('admin@teste.com / senha123');
        console.log('operator@teste.com / senha123');
        console.log('client@teste.com / senha123');

        await mongoose.disconnect();
        process.exit(0);
    } catch (e) {
        console.error('Erro no seed:', e.message);
        process.exit(1);
    }
}

seed();