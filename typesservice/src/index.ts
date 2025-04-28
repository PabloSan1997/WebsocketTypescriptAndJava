import express from 'express';
import cors from 'cors';
import { envvariables } from "./envvariables";
import { createApi } from "./routes/main";
import { AppDataSource } from "./persistence/AppDataSource";
import { app, io, server } from './config/serverconfig';
import { createSocket } from './controllers/websocketController';
import { boomHandle } from './middleware/boomHandle';
import { join } from 'node:path';

app.use(cors());
app.use(express.json());

createSocket(io);
createApi(app);
app.use(boomHandle);

app.use('/', express.static(join(__dirname, '..', 'static')));

AppDataSource.initialize().then(() => {
    server.listen(envvariables.port, () => {
        console.log(`Port: ${envvariables.port}`)
    });
}).catch(console.error);