import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import categoriaRepository from "../repositories/categoria.repository";

const categoriasRoutes = Router();

categoriasRoutes.get('/categorias', async (req: Request, res: Response, next: NextFunction) => {
    const categorias = await categoriaRepository.findAll();
    res.status(StatusCodes.OK).send(categorias);
})

categoriasRoutes.get('/categorias/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const id_categoria = req.params.id;
        const categoria = await categoriaRepository.findById(id_categoria);
        res.status(StatusCodes.OK).send(categoria);
    } catch (error) {
        next(error);
    }
})

categoriasRoutes.post('/categorias', async (req: Request, res: Response, next: NextFunction) => {
    const novaCategoria = req.body;
    const id_categoria = await categoriaRepository.save(novaCategoria);
    res.status(StatusCodes.CREATED).send(id_categoria);
});

categoriasRoutes.put('/categorias/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const categoriaEdicao = req.body;

    await categoriaRepository.update(categoriaEdicao);

    res.status(StatusCodes.OK).send();
});

categoriasRoutes.delete('/categorias/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await categoriaRepository.delete(id);
    res.sendStatus(StatusCodes.OK);
});

export default categoriasRoutes;