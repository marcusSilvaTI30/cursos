import { DataSource } from 'typeorm';
import { Funcionario } from '../entities/Funcionario';
import { ItemPedido } from '../entities/ItemPedido';
import { Pedido } from '../entities/Pedido';
import { Produto } from '../entities/Produto';

export const typeorm = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '325457',
  database: 'lets-code',
  entities: [Produto, Funcionario, Pedido, ItemPedido],
  migrations: ['./migrations/*.ts'],
  migrationsTableName: 'migrations',
  logging: false,
  synchronize: true,
  migrationsRun: true,
});
