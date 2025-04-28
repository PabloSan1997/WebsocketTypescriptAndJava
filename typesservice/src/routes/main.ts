import {Router, Express} from 'express';
import { userroutes } from '../controllers/UserController';
import { messageroutes } from '../controllers/MessageController';

const main = Router();
export function createApi(app:Express){
    app.use('/api', main);
    main.use('/user', userroutes);
    main.use('/message', messageroutes);
}