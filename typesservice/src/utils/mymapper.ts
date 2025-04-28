import { MessageEntity } from "../persistence/entities/Message";
import { Users } from "../persistence/entities/Users";

export const mymapper = {
    convertMessage(data:MessageEntity):MessageDto{
        return {
            id: data.id,
            message: data.message,
            createdAt: data.createdAt,
            user: mymapper.convertUserHeader(data.usersend)
        }
    },
    convertUserHeader(data:Users):UserHeader{
        return {
            username: data.username,
            nickname: data.nickname,
            urlImage: data.urlImage
        }
    }    
}