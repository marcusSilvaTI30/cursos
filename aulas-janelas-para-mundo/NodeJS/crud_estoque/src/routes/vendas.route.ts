import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import vendaRepository from '../repositories/venda.repository';

const vendasRoutes = Router();

vendasRoutes.get('/vendas', async (req: Request, res: Response, next: NextFunction) => {
    const vendas = await vendaRepository.findAll();
    res.status(StatusCodes.OK).send(vendas);
})

vendasRoutes.get('/vendas/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const venda = await vendaRepository.findById(id);
        res.status(StatusCodes.OK).send(venda);
    } catch (error) {
        next(error);
    }
})

vendasRoutes.post('/vendas', async (req: Request, res: Response, next: NextFunction) => {
    const venda = req.body;
    const id = await vendaRepository.save(venda);
    res.status(StatusCodes.CREATED).send(id);
});

export default vendasRoutes;