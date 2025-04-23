/// <reference types="vite/client" />

interface RegisterDto{
    username:string;
    password:string;
    nickname:string;
    urlImage:string;
}

interface LoginDto{
    username:string;
    password:string;
}

interface TokenResponse{
    username:string;
    jwt:string;
}

interface UserHeader{
    username:string;
    nickname:string;
    urlImage:string;
}

interface MessageDto{
    id:number;
    message:string;
    createdAt:string;
    user:UserHeader;
}

interface ReadApi{
    login(data:LoginDto):Promise<TokenResponse>;
    register(data:RegisterDto):Promise<TokenResponse>;
    getUserList(tokne:string):Promise<UserHeader[]>;
    findMessages(userfriend:string, token:string):Promise<MessageDto>;
}


interface Children{
    children:JSX.Element|JSX.Element[]
}