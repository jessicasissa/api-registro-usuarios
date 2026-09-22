import mongoose from "mongoose";

class DatabaseClient {

    constructor() {
        this.connectDatabase();
    }

    async connectDatabase() {
        const queryString = process.env.DATABASE_URL;
        await mongoose.connect(queryString);
    } 

    async disconnectDatabase() {
        try {
            await mongoose.disconnect();
            console.log('conexão encerrada');
        } catch (e) {
            console.error('erro ao encerrar conexão: ', e);
        }
    }

}

export default new DatabaseClient();