import { In, Repository } from 'typeorm';
import { typeorm } from '../data/data-source';
import CriarProdutoDTO from '../dtos/CriarProdutoDTO';
import { Produto } from '../entities/Produto';

export class ProdutoService {
  private produtoRepository: Repository<Produto>;

  constructor() {
    this.produtoRepository = typeorm.getRepository(Produto);
  }

  async findAll() {
    return this.produtoRepository.find();
  }

  async findProdutos(produtosIds: number[]) {
    return this.produtoRepository.find({ where: { id: In(produtosIds) } });
  }

  async criarProduto(produto: CriarProdutoDTO) {
    return this.produtoRepository.save(produto);
  }
}
