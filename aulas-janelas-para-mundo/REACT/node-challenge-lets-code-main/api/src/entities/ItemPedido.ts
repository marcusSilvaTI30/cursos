import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Pedido } from './Pedido';
import { Produto } from './Produto';

@Entity('item_pedido')
export class ItemPedido {

  constructor(pedido?: Pedido, produto?: Produto) {
    if (pedido) {
      this.pedido = pedido;
    }
    if (produto) {
      this.produto = produto;
    }
  }

  @PrimaryColumn({ type: "int", name: "pedidoId"})
  @ManyToOne(type => Pedido, (pedido: Pedido) => pedido.itens)
  pedido: Pedido;
  
  @PrimaryColumn({ type: "int", name: "produtoId"})
  @ManyToOne(type => Produto)
  produto: Produto;
}
