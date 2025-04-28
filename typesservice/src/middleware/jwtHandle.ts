
import {Request, Response, NextFunction} from 'express';
import boom from '@hapi/boom';
import { jwtService } from '../services/JwtService';

export function jwtHandle(rolename:string){
    return (req:Request, res:Response, next:NextFunction)=>{
        const header = req.headers.authorization;
        if(!header || !header.startsWith('Bearer ')){
            next(boom.forbidden('jwt not allowed'));
            return;
        }

        const token = header.replace('Bearer ', '');
        const usersecurity = jwtService.validationToken(token);
        if(rolename !== usersecurity.authority){
            next(boom.forbidden('jwt not allowed'));
            return;
        }
        req.params.theusername = usersecurity.username;
        
        next();
    }
}