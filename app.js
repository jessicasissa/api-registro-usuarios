import 'dotenv/config';
import express from 'express';
import routesUsers from './routes/users.js';
import bodyParser from 'body-parser';

const app = express();

// middleware 
app.use(express.json());
app.use(express.urlencoded({
        extended: true
    })
);

app.use('/users', routesUsers);

try{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log('servidor ativo na porta ', PORT));
} catch(e){
    console.log(e);
}