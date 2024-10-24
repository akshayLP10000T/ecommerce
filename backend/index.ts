import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './database/connectDB';
import userRoute from './routes/user';
import adminRoute from './routes/admin';

dotenv.config();

const PORT = process.env.PORT || 3000; // Port of backend server
const app = express();

//Default middlewares
app.use(bodyParser.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

//Own API's for data
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);

//Server listening
app.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Server listening to port ${PORT}`);
});