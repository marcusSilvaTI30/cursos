import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import pagamentoRepository from '../repositories/pagamento.repository';

const pagamentosRoutes = Router();

pagamentosRoutes.get('/tipos-pagamentos', async (req: Request, res: Response, next: NextFunction) => {
    const pagamentos = await pagamentoRepository.findAll();
    res.status(StatusCodes.OK).send(pagamentos);
})

pagamentosRoutes.get('/tipos-pagamentos/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const pagamento = await pagamentoRepository.findById(id);
        res.status(StatusCodes.OK).send(pagamento);
    } catch (error) {
        next(error);
    }
})

pagamentosRoutes.post('/tipos-pagamentos', async (req: Request, res: Response, next: NextFunction) => {
    const pagamento = req.body;
    const id = await pagamentoRepository.save(pagamento);
    res.status(StatusCodes.CREATED).send(id);
});

pagamentosRoutes.put('/tipos-pagamentos/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const pagamento = req.body;

    await pagamentoRepository.update(pagamento);

    res.status(StatusCodes.OK).send();
});

pagamentosRoutes.delete('/tipos-pagamentos/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await pagamentoRepository.delete(id);
    res.sendStatus(StatusCodes.OK);
});

export default pagamentosRoutes;