import { MongoClient } from "mongodb";

class DatabaseClient {
    constructor() {
        const queryString = process.env.DATABASE_URL;
        this.client = new MongoClient(queryString);
        this.connectDB();
    } 

    async connectDB() {
        try {
            await this.client.connect();
            this.db = this.client.db('registro_usuarios');
            console.log('conectado ao servidor de base de dados');
        } catch (e) {
            console.log(e);
        }
    }
}

export default new DatabaseClient;