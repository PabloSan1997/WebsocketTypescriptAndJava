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
    createdAt:Date;
    user:UserHeader;
}
interface SaveMessageDto{
    message:string;
}

interface UserSecurity{
    username:string;
    nickname:string;
    authority:string;
}

interface SaveMessageDto{
    message:string;
}


