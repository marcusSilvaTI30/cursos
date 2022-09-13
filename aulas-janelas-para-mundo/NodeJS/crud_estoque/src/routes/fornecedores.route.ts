import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import fornecedorRepository from '../repositories/fornecedor.repository';

const fornecedoresRoutes = Router();

fornecedoresRoutes.get('/fornecedores', async (req: Request, res: Response, next: NextFunction) => {
    const fornecedores = await fornecedorRepository.findAll();
    res.status(StatusCodes.OK).send(fornecedores);
})

fornecedoresRoutes.get('/fornecedores/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const cliente = await fornecedorRepository.findById(id);
        res.status(StatusCodes.OK).send(cliente);
    } catch (error) {
        next(error);
    }
})

fornecedoresRoutes.post('/fornecedores', async (req: Request, res: Response, next: NextFunction) => {
    const cliente = req.body;
    const id = await fornecedorRepository.save(cliente);
    res.status(StatusCodes.CREATED).send(id);
});

fornecedoresRoutes.put('/fornecedores/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const cliente = req.body;

    await fornecedorRepository.update(cliente);

    res.status(StatusCodes.OK).send();
});

fornecedoresRoutes.delete('/fornecedores/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await fornecedorRepository.delete(id);
    res.sendStatus(StatusCodes.OK);
});

export default fornecedoresRoutes;