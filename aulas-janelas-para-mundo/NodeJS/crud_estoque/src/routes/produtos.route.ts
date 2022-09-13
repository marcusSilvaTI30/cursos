import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import produtoRepository from '../repositories/produto.repository';

const produtosRoutes = Router();

produtosRoutes.get('/produtos', async (req: Request, res: Response, next: NextFunction) => {
    const produtos = await produtoRepository.findAll();
    res.status(StatusCodes.OK).send(produtos);
})

produtosRoutes.get('/produtos/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const produto = await produtoRepository.findById(id);
        res.status(StatusCodes.OK).send(produto);
    } catch (error) {
        next(error);
    }
})

produtosRoutes.post('/produtos', async (req: Request, res: Response, next: NextFunction) => {
    const produto = req.body;
    const id = await produtoRepository.save(produto);
    res.status(StatusCodes.CREATED).send(id);
});

produtosRoutes.put('/produtos/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const produto = req.body;

    await produtoRepository.update(produto);

    res.status(StatusCodes.OK).send();
});

produtosRoutes.delete('/produtos/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await produtoRepository.delete(id);
    res.sendStatus(StatusCodes.OK);
});

export default produtosRoutes;