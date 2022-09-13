import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import clienteRepository from '../repositories/cliente.repository';

const clientesRoutes = Router();

clientesRoutes.get('/clientes', async (req: Request, res: Response, next: NextFunction) => {
    const clientes = await clienteRepository.findAll();
    res.status(StatusCodes.OK).send(clientes);
})

clientesRoutes.get('/clientes/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const cliente = await clienteRepository.findById(id);
        res.status(StatusCodes.OK).send(cliente);
    } catch (error) {
        next(error);
    }
})

clientesRoutes.post('/clientes', async (req: Request, res: Response, next: NextFunction) => {
    const cliente = req.body;
    const id = await clienteRepository.save(cliente);
    res.status(StatusCodes.CREATED).send(id);
});

clientesRoutes.put('/clientes/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const cliente = req.body;

    await clienteRepository.update(cliente);

    res.status(StatusCodes.OK).send();
});

clientesRoutes.delete('/clientes/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await clienteRepository.delete(id);
    res.sendStatus(StatusCodes.OK);
});

export default clientesRoutes;