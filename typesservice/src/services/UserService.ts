import { AppDataSource } from "../persistence/AppDataSource"
import { Users } from "../persistence/entities/Users";
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import { jwtService } from "./JwtService";
import { Not } from "typeorm";

const userrepository = AppDataSource.getRepository(Users);
export const UserService = {
    async register(data:RegisterDto):Promise<TokenResponse>{
        const viewuser = await userrepository.findOne({where:{username:data.username}});
        if(!!viewuser)
            throw boom.badRequest('Username ocupado');
        const password = await bcrypt.hash(data.password, 11);
        const newuser = userrepository.create({...data, password, role:'USER'});
        await userrepository.save(newuser);
        return this.login({username: newuser.username, password:data.password});
    },
    async login(data:LoginDto):Promise<TokenResponse>{
        const user = await this.findUser(data.username);
        const viewpassword = await bcrypt.compare(data.password, user.password);
        if(!viewpassword)
            throw boom.badRequest('Username o password incorrectos');

        const token = jwtService.generateToken({username:user.username, authority:user.role, nickname:user.nickname});
        return {username: user.username, jwt:token}
    },
    async viewHeader(username:string):Promise<UserHeader>{
        const {nickname, urlImage} = await this.findUser(username);
        return {username, nickname, urlImage}
    },
    async friendsHeader(username:string, {size, page}:{size:number, page:number}):Promise<UserHeader[]>{
        const users = await userrepository.find({
            select:{
                username:true,
                nickname:true,
                urlImage:true
            },
            skip:page*size,
            take:size,
            where:{
                username:Not(username)
            }
        });
        return users;
    },
    async findUser(username:string):Promise<Users>{
        const user = await userrepository.findOne({where:{username}});
        if(user == null)
            throw boom.badRequest('username no encontrado');
        return user;
    }
}


