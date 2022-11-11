import { Request, Response } from 'express';
import { ProdutoService } from '../services/produto.service';

export class ProdutoController {
  async findAll(request: Request, response: Response) {
    try {
      const service = new ProdutoService();
      const result = await service.findAll();
      return response.json(result);
    } catch (error: any) {
      console.log(error);
      return response.json({ error: error.message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { descricao, preco, estoque } = request.body;
      const service = new ProdutoService();
      const result = await service.criarProduto({ descricao, preco, estoque });
      return response.json(result);
    } catch (error: any) {
      return response.json({ error: error.message });
    }
  }
}
