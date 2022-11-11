import { Produto } from '../entities/Produto';
import { typeorm } from './data-source';

export const populaBanco = async () => {
  const produto = await typeorm
    .getRepository(Produto)
    .createQueryBuilder('produto')
    .where('produto.descricao = :descricao', { descricao: 'coca-cola' })
    .getOne();

  if (produto) {
    return;
  }

  await typeorm.createQueryRunner().query(`
  -- Produtos
  insert into produto (descricao, estoque, preco) values
  ('coca-cola', 100, 99.99),
  ('fanta', 87, 88.2),
  ('pepsi', 200, 205.5),
  ('dolinho', 0, 90);
  
  -- Gerentes
  insert into funcionario (nome, cargo) values 
  ('Patrick Hayes', 'GERENTE'),
  ('Myrtle Ramos', 'GERENTE');
  
  -- Vendedores
  insert into funcionario (nome, cargo, "gerenteId") values 
  ('Minerva Hughes', 'VENDEDOR', (select id from funcionario where nome = 'Patrick Hayes')),
  ('Jay Zimmerman', 'VENDEDOR', (select id from funcionario where nome = 'Myrtle Ramos')),
  ('Gertrude Barton', 'VENDEDOR', (select id from funcionario where nome = 'Patrick Hayes')),
  ('Olga Copeland', 'VENDEDOR', (select id from funcionario where nome = 'Patrick Hayes')),
  ('Ray Mitchell', 'VENDEDOR', (select id from funcionario where nome = 'Myrtle Ramos'));
  
  -- Pedidos
  insert into pedido ("vendedorId", endereco_entrega, preco_total, data_pedido) values 
  ((select id from funcionario where nome = 'Ray Mitchell'), 'Rua Logradouro, 999', 0, '2022-10-16 00:00:01'),
  ((select id from funcionario where nome = 'Minerva Hughes'), 'Rua Logradouro, 123', 0, '2022-10-16 00:00:01'),
  ((select id from funcionario where nome = 'Minerva Hughes'), 'Rua Logradouro, 111', 0, '2022-10-16 00:00:01'),
  ((select id from funcionario where nome = 'Minerva Hughes'), 'Rua Logradouro, 456', 0, '2022-10-16 00:00:01'),
  ((select id from funcionario where nome = 'Jay Zimmerman'), 'Rua Logradouro, 774', 0, '2022-10-16 00:00:01'),
  ((select id from funcionario where nome = 'Gertrude Barton'), 'Rua Logradouro, 876', 0, '2022-10-16 00:00:01'),
  ((select id from funcionario where nome = 'Minerva Hughes'), 'Rua Logradouro, 462', 0, '2022-10-16 00:00:01'),
  ((select id from funcionario where nome = 'Jay Zimmerman'), 'Rua Logradouro, 189', 0, '2022-10-16 00:00:01'),
  ((select id from funcionario where nome = 'Ray Mitchell'), 'Rua Logradouro, 982', 0, '2022-10-16 00:00:01'),
  ((select id from funcionario where nome = 'Ray Mitchell'), 'Rua Logradouro, 363', 0, '2022-10-16 00:00:01');
  
  -- Itens de pedido 
  insert into item_pedido ("pedidoId", "produtoId") values 
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 999'), (select id from produto where descricao = 'coca-cola')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 999'), (select id from produto where descricao = 'pepsi')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 123'), (select id from produto where descricao = 'fanta')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 111'), (select id from produto where descricao = 'dolinho')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 111'), (select id from produto where descricao = 'pepsi')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 456'), (select id from produto where descricao = 'coca-cola')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 456'), (select id from produto where descricao = 'fanta')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 456'), (select id from produto where descricao = 'pepsi')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 774'), (select id from produto where descricao = 'pepsi')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 876'), (select id from produto where descricao = 'coca-cola')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 876'), (select id from produto where descricao = 'fanta')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 876'), (select id from produto where descricao = 'pepsi')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 876'), (select id from produto where descricao = 'dolinho')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 462'), (select id from produto where descricao = 'dolinho')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 462'), (select id from produto where descricao = 'pepsi')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 189'), (select id from produto where descricao = 'fanta')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 982'), (select id from produto where descricao = 'fanta')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 982'), (select id from produto where descricao = 'dolinho')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 363'), (select id from produto where descricao = 'coca-cola')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 363'), (select id from produto where descricao = 'pepsi')),
  ((select id from pedido where endereco_entrega = 'Rua Logradouro, 363'), (select id from produto where descricao = 'dolinho'));
  
  -- Atualiza total dos pedidos
  update pedido 
  set preco_total = precos.preco_total 
  from pedido p
  inner join 
  (
    select p.id, sum(p2.preco) as preco_total
    from pedido p 
    inner join item_pedido ip on p.id = ip."pedidoId" 
    inner join produto p2 on ip."produtoId" = p2.id 
    group by p.id
  ) as precos on p.id = precos.id
  where pedido.id = p.id  
  `);
};
