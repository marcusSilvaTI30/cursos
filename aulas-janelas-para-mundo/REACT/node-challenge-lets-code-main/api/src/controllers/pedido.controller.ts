import { Request, Response } from 'express';
import { Funcionario } from '../entities/Funcionario';
import { ItemPedido } from '../entities/ItemPedido';
import { Produto } from '../entities/Produto';
import { FuncionarioService } from '../services/funcionario.service';
import { PedidoService } from '../services/pedido.service';
import { ProdutoService } from '../services/produto.service';

export class PedidoController {
  async findAll(request: Request, response: Response) {
    try {
      const pedidoService = new PedidoService();
      const result = await pedidoService.findAll();
      return response.json(result);
    } catch (error: any) {
      console.log(error);
      return response.json({ error: error.message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { vendedorId, produtosIds, data_pedido, endereco_entrega } = request.body;
      const funcionarioService = new FuncionarioService();
      const produtoService = new ProdutoService();

      let vendedor: Funcionario | undefined = await funcionarioService.find(vendedorId) || undefined;

      if (!vendedor) {
        return response.status(404).json({ error: "Vendedor não encontrado" });
      }

      const produtos = await produtoService.findProdutos(produtosIds);

      if (!produtos || produtos.length < 1) {
        return response.status(404).json({ error: "Produtos não encontrados" });
      }

      const preco_total = produtos.map(p => Number(p.preco)).reduce((acumulador, preco) => 
        acumulador + preco, 0
      );

      const pedidoService = new PedidoService();
      const result = await pedidoService.criarPedido({
        vendedor,
        produtos,
        data_pedido,
        endereco_entrega,
        preco_total
      });
      return response.json(result);
    } catch (error: any) {
      return response.json({ error: error.message });
    }
  }
}
