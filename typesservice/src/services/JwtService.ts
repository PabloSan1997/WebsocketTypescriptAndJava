import jwt from 'jsonwebtoken';
import { envvariables } from '../envvariables';
import boom from '@hapi/boom';

export const jwtService = {
    generateToken(user:UserSecurity):string{
        try {
            return  jwt.sign(user, envvariables.jwtkey as string, {expiresIn:'1d', subject:user.username});
        } catch (error) {
            throw boom.forbidden('authentication is wrong');
        }
    },
    validationToken(token:string):UserSecurity{
        try {
            const data = jwt.verify(token, envvariables.jwtkey as string);

            return data as UserSecurity;
        } catch (error) {
            throw boom.forbidden('authentication is wrong');
        }
    }
}