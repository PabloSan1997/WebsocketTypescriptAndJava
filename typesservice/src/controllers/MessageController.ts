
import { Request, Response, NextFunction, Router } from 'express';
import { messageService } from '../services/MessageService';
import boom from '@hapi/boom';
import { jwtHandle } from '../middleware/jwtHandle';

const messageController = {
    async findMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const userfriend = req.query.userfriend;
            if (!userfriend) throw boom.badRequest('No se detecto "userfriend"');
            console.log(req.params.theusername + 'mira')
            const mira = messageService.findMessages(req.params.theusername, userfriend as string);
            res.json(await mira);
        } catch (error) {
            next(error);
        }
    },
    async deletemessage(req: Request, res: Response, next: NextFunction) {
        try {
            await messageService.deleteMessage(req.params.theusername, Number(req.params.id));
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

export const messageroutes = Router();

messageroutes.get('/', jwtHandle('USER'), messageController.findMessage);
messageroutes.delete('/:id', jwtHandle('USER'), messageController.deletemessage);