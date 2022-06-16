import chalk from 'chalk';
import express from 'express';
import debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectToServer } from './database/conn'
import expenseRoutes from './routes/expenseRoutes';
import cors from 'cors';

dotenv.config({ path: "./config.env" });
const app = express();
const serverDebug = debug('server');
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(cors());
app.use('/expense', expenseRoutes);

app.listen(port, () => {
    connectToServer(function(err){
        if(err){
            serverDebug(err);
        }
    })
    serverDebug(`Listening to port ${chalk.green(port)}`);
});