import { Router } from 'express';
import { FuncionarioController } from './controllers/funcionario.controller';
import { PedidoController } from './controllers/pedido.controller';
import { ProdutoController } from './controllers/produto.controller';

export const router = Router();

router.get('/produto', new ProdutoController().findAll);
router.post('/produto', new ProdutoController().create);

router.get('/pedido', new PedidoController().findAll);
router.post('/pedido', new PedidoController().create);

router.get('/funcionario', new FuncionarioController().findAll);
router.get(
  '/funcionario/gerentes',
  new FuncionarioController().findAllGerentes
);
router.post('/funcionario', new FuncionarioController().create);
