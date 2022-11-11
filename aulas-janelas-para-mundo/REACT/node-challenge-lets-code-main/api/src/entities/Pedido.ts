import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from './Funcionario';
import { ItemPedido } from './ItemPedido';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Funcionario, (funcionario: Funcionario) => funcionario.pedidos)
  vendedor: Funcionario;
  
  @OneToMany(type => ItemPedido, (item: ItemPedido) => item.pedido)
  itens?: ItemPedido[];

  @Column()
  endereco_entrega: string;
  
  @Column()
  preco_total: number;

  @Column()
  data_pedido: Date;
}
