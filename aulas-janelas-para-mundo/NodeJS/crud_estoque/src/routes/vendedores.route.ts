import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import vendedorRepository from '../repositories/vendedor.repository';

const vendedoresRoutes = Router();

vendedoresRoutes.get('/vendedores', async (req: Request, res: Response, next: NextFunction) => {
    const vendedores = await vendedorRepository.findAll();
    res.status(StatusCodes.OK).send(vendedores);
})

vendedoresRoutes.get('/vendedores/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const vendedor = await vendedorRepository.findById(id);
        res.status(StatusCodes.OK).send(vendedor);
    } catch (error) {
        next(error);
    }
})

vendedoresRoutes.post('/vendedores', async (req: Request, res: Response, next: NextFunction) => {
    const vendedor = req.body;
    const id = await vendedorRepository.save(vendedor);
    res.status(StatusCodes.CREATED).send(id);
});

vendedoresRoutes.put('/vendedores/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const vendedor = req.body;

    await vendedorRepository.update(vendedor);

    res.status(StatusCodes.OK).send();
});

vendedoresRoutes.delete('/vendedores/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await vendedorRepository.delete(id);
    res.sendStatus(StatusCodes.OK);
});

export default vendedoresRoutes;