import boom from '@hapi/boom';
import { jwtService } from "../services/JwtService";
import { messageService } from "../services/MessageService";
import { Boom } from "@hapi/boom";
import { Server } from "socket.io";

export function createSocket(io: Server) {
    io.use((socket, next) => {
        const header = socket.handshake.auth.jwt as string | null | undefined;
        if (!header)
            return next(boom.badRequest('authentication fail'));
        try {
            const user = jwtService.validationToken(header);
            socket.data.username = user.username;
            next();
        } catch (error) {
            next(error as boom.Boom | Error);
        }
    });

    io.on('connection', socket => {
        const username = socket.data.username;
        socket.join(username);
        socket.on('mes', async (data: { savemessage: SaveMessageDto, userfriend: string }) => {
            try {
                const message = await messageService.saveMessage(socket.data.username, data.userfriend, data.savemessage);
                io.to(username).emit('mes', message);
                io.to(data.userfriend).emit('mes', message);
            } catch (error) {
                const err = error as Boom;
                if (err.isBoom) {
                    io.to(username).emit('error_mes', { message: err.output.payload.message })
                } else {
                    io.to(username).emit('error_mes', 'error al mandar el mensaje');
                }
            }
        });
    })
}