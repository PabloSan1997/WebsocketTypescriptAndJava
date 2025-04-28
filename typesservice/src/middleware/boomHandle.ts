import { Request, Response, NextFunction } from 'express';
import boom, { Boom } from '@hapi/boom';

export function boomHandle(err: Boom, _req: Request, res: Response, _next: NextFunction) {
    if (err.isBoom) {
        res.status(err.output.payload.statusCode).json(err.output.payload);
    } else {
        const d = boom.badImplementation(err.message);
        res.status(500).json(d.output.payload);
    }
}