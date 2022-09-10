import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import categoriaRepository from "../repositories/categoria.repository";

const categoriaRoutes = Router();

categoriaRoutes.get('/categorias', async (req: Request, res: Response, next: NextFunction) => {
    const categorias = await categoriaRepository.buscarTodos();
    res.status(StatusCodes.OK).send(categorias);
})

categoriaRoutes.get('/categorias/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id_categoria = req.params.id;
        const categoria = await categoriaRepository.buscarPorId(id_categoria);
        res.status(StatusCodes.OK).send(categoria);
    } catch (error) {
        next(error);
    }
})

categoriaRoutes.post('/categorias', async (req: Request, res: Response, next: NextFunction) => {
    const novaCategoria = req.body;
    const id_categoria = await categoriaRepository.criar(novaCategoria);
    res.status(StatusCodes.CREATED).send(id_categoria);
});

categoriaRoutes.put('/categorias/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const categoriaEdicao = req.body;

    await categoriaRepository.atualizar(categoriaEdicao);

    res.status(StatusCodes.OK).send();
});

categoriaRoutes.delete('/categorias/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await categoriaRepository.remover(id);
    res.sendStatus(StatusCodes.OK);
});

export default categoriaRoutes;