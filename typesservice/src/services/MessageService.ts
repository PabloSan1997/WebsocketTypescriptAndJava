import { AppDataSource } from "../persistence/AppDataSource"
import { MessageEntity } from "../persistence/entities/Message"
import { Users } from "../persistence/entities/Users";
import boom from '@hapi/boom';
import { mymapper } from "../utils/mymapper";
import { io } from "../config/serverconfig";


const messagerepostory = AppDataSource.getRepository(MessageEntity);
const userrepository = AppDataSource.getRepository(Users);
export const messageService = {
    async findMessages(username: string, frienduser: string): Promise<MessageDto[]> {
        if (!username || !frienduser) throw boom.badRequest('user no encontrado');
        const messages = await messagerepostory.find({
            relations: {
                userrecive: true,
                usersend: true
            },
            where: [
                {
                    usersend: { username },
                    userrecive: { username: frienduser }
                },
                {
                    usersend: { username: frienduser },
                    userrecive: { username }
                }
            ],
            order: {
                createdAt: 'ASC'
            }
        });
        return messages.map(mymapper.convertMessage);
    },
    async deleteMessage(username: string, id: number): Promise<void> {
        if (isNaN(id)) throw boom.badRequest('mensaje invalido');
        const message = await messagerepostory.findOne({
            where: {
                usersend: { username },
                id
            },
            relations: { userrecive: true, usersend: true }
        });
        if (!!message) {
            const userfriend = message.userrecive.username;
            await messagerepostory.delete({ id });
            io.to(username).emit('mesdelete', { id });
            io.to(userfriend).emit('mesdelete', { id });
        }
    },
    async saveMessage(username: string, userfriend: string, data: SaveMessageDto): Promise<MessageDto> {
        const user1 = userrepository.findOne({ where: { username: username } });
        const user2 = userrepository.findOne({ where: { username: userfriend } });

        const user = await user1;
        const userfriendentity = await user2

        if (!userfriendentity || !user) {
            throw boom.badRequest('usuarios no encontrados invalido');
        }

        const newmessage = messagerepostory.create({ ...data, createdAt: new Date() });
        newmessage.userrecive = userfriendentity;
        newmessage.usersend = user;
        await messagerepostory.save(newmessage);
        return mymapper.convertMessage(newmessage);
    }
}