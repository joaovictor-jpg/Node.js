import mongoose from "mongoose";

async function conectarNaDataBase() {
    mongoose.connect("mongodb://admin:admin123456@localhost:27017");
    return mongoose.connection;
};

export default conectarNaDataBase;