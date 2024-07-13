import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: ['http://localhost:3000', 'https://icomfort-test.vercal.app', 'https://icomfort.bis-pro.com'], // List of allowed origins
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', apiRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
