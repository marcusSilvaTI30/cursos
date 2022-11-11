import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;
  
  @Column()
  estoque: number;
  
  @Column({ type: "numeric"})
  preco: number;
}
