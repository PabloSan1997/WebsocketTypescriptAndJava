import {Request, Response, NextFunction, Router} from 'express';
import { UserService } from '../services/UserService';
import { jwtHandle } from '../middleware/jwtHandle';

const usercontroller = {
    async login(req:Request, res:Response, next:NextFunction){
        try {
            const data = UserService.login(req.body);
            res.json(await data);
        } catch (error) {
            next(error);
        }
    },
    async register(req:Request, res:Response, next:NextFunction){
        try {
            const data = UserService.register(req.body);
            res.status(201).json(await data);
        } catch (error) {
            next(error);
        }
    },
    async findUserHeader(req:Request, res:Response, next:NextFunction){
        try {
            const data = UserService.viewHeader(req.params.theusername);
            res.json(await data);
        } catch (error) {
            next(error);
        }
    },
    async findUserHeaderFriends(req:Request, res:Response, next:NextFunction){
        try {
            const pageable = {
                page:Number(req.query.page) || 0,
                size:Number(req.query.size) || 10
            }
            
            const data = UserService.friendsHeader(req.params.theusername, pageable);
            res.json(await data);
        } catch (error) {
            next(error);
        }
    }
}

export const userroutes = Router();

userroutes.post('/register', usercontroller.register);
userroutes.post('/login', usercontroller.login);
userroutes.get('/viewheader', jwtHandle('USER'), usercontroller.findUserHeader);
userroutes.get('/findfriendheader', jwtHandle('USER'), usercontroller.findUserHeaderFriends);