import { Repository } from 'typeorm';
import { typeorm } from '../data/data-source';
import CriarPedidoDTO from '../dtos/CriarPedidoDTO';
import { ItemPedido } from '../entities/ItemPedido';
import { Pedido } from '../entities/Pedido';

export class PedidoService {
  private pedidoRepository: Repository<Pedido>;
  private itemPedidoRepository: Repository<ItemPedido>;

  constructor() {
    this.pedidoRepository = typeorm.getRepository(Pedido);
    this.itemPedidoRepository = typeorm.getRepository(ItemPedido);
  }

  async findAll() {
    return this.pedidoRepository.find({
      relations: ['vendedor', 'itens', 'itens.produto'],
    });
  }

  async criarPedido(pedidoDTO: CriarPedidoDTO): Promise<Pedido> {
    let pedido = await this.pedidoRepository.save({
      vendedor: pedidoDTO.vendedor,
      endereco_entrega: pedidoDTO.endereco_entrega,
      data_pedido: pedidoDTO.data_pedido,
      preco_total: pedidoDTO.preco_total,
    });

    let itensPedido = pedidoDTO.produtos.map((p) => new ItemPedido(pedido, p));

    await this.itemPedidoRepository.save(itensPedido);

    return this.pedidoRepository.findOneOrFail({
      where: { id: pedido.id },
      relations: ['vendedor', 'itens'],
    });
  }
}
