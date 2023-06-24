/**

Connects to the MongoDB database using Mongoose.
@async
@function connectDB
@returns {void}
@throws {Error} If there is an error while connecting to the database.
*/
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
try {
await mongoose.connect(process.env.MONGO_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
});
console.log('Conexão com o MongoDB estabelecida.');
} catch (error) {
console.error('Erro ao conectar ao MongoDB:', error.message);
process.exit(1);
}
};

export default connectDB;