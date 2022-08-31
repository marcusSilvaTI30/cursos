--Criação de tabelas
CREATE TABLE tb_cliente (
    id_cliente bigserial PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    telefone  VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL
);

CREATE TABLE tb_vendedor(
	id_vendedor bigserial PRIMARY KEY,
	nome VARCHAR(45) NOT NULL
);

CREATE TABLE tb_pagamento(
	id_pagamento bigserial PRIMARY KEY,
	descr_pagamento VARCHAR(45) NOT NULL
);

CREATE TABLE tb_categoria(
	id_categoria bigserial PRIMARY KEY,
	descricao VARCHAR(45) NOT NULL
);

CREATE TABLE tb_fornecedor(
	id_fornecedor bigserial PRIMARY KEY,
	cnpj VARCHAR(45) NOT NULL,
	nome VARCHAR(45) NOT NULL
);

CREATE TABLE tb_venda (
	id_venda bigserial PRIMARY KEY,
	valor_total DECIMAL NOT NULL,	
	id_cliente INT NOT NULL, FOREIGN KEY(id_cliente) REFERENCES tb_cliente(id_cliente),
	id_vendedor INT NOT NULL, FOREIGN KEY(id_vendedor) REFERENCES tb_vendedor(id_vendedor),
	id_pagamento INT NOT NULL, FOREIGN KEY(id_pagamento) REFERENCES tb_pagamento(id_pagamento),
	data_venda DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE tb_produto (
	id_produto bigserial PRIMARY KEY,
	descricao VARCHAR(45) NOT NULL,
	preco DECIMAL NOT NULL,
	quantidade_estoque INT NOT NULL,
	id_categoria INT NOT NULL, FOREIGN KEY(id_categoria) REFERENCES tb_categoria(id_categoria),
	id_fornecedor INT NOT NULL, FOREIGN KEY(id_fornecedor) REFERENCES tb_fornecedor(id_fornecedor)
);

CREATE TABLE tb_venda_has_produto (
	id_venda INT NOT NULL, FOREIGN KEY(id_venda) REFERENCES tb_venda(id_venda),
	id_produto INT NOT NULL, FOREIGN KEY(id_produto) REFERENCES tb_produto(id_produto)
);


-- Inserção de DADOS
INSERT INTO 
	tb_categoria(descricao)
VALUES
	('Padaria'),
	('Alimentos'),
	('Hortifruti'),
	('Produtos de limpeza'),
	('Higiene pessoal'),
	('Bebidas');

INSERT INTO 
	tb_fornecedor(cnpj,nome)
VALUES
	('38334501000187', 'Abc Fretes'),
	('27327025000150', 'XYZ Entregas'),
	('63391948000135', 'BYQ Frete');

INSERT INTO 
	tb_pagamento(descr_pagamento)
VALUES
	('Débito'),
	('Dinheiro'),
	('Crédito'),
	('Cheque'),
	('PIX');
	
INSERT INTO 
	tb_vendedor(nome)
VALUES	
	('Pedro'),
	('Júnior'),
	('Geraldo');

INSERT INTO 
	tb_cliente(nome, telefone, email)
VALUES
	('Flávio', '61992585474', 'flavio@xpto.com'),
	('Joana',  '61992558233', 'joana@xpto.com'),
	('Maria',  '61998584587', 'maria@xpto.com');

INSERT INTO 
	tb_produto(descricao, preco, quantidade_estoque, id_categoria, id_fornecedor)
VALUES
	('Arroz', 15.20, 10, 19, 7),
	('Feijão',   5.20, 4, 19, 7),
	('Macarrão', 3.20, 5, 20, 8),
	('Macarrão', 1.20, 2, 20, 9);


--Insert com unico produto
WITH data(valor_total, data_venda, id_cliente, id_vendedor, id_pagamento) AS (
   VALUES                    
      (10.00, '1978-02-05', 7, 7, 11)
   )
, ins1 AS (
   INSERT INTO tb_venda (valor_total, id_cliente, id_vendedor, id_pagamento)
   SELECT valor_total, id_cliente, id_vendedor, id_pagamento
   FROM   data
   RETURNING id_venda
   )

INSERT INTO tb_venda_has_produto (id_venda, id_produto)
SELECT id_venda, 18
FROM   ins1
RETURNING id_venda;

--Insert com varios produtos

--Consultas  nas tabelas
--retorna categoria padaria e fornecedor abc fretes
SELECT 
	produto.descricao,	
	categoria.descricao,
	produto.id_fornecedor,
	fornecedor.nome
FROM 
	tb_produto AS produto
INNER JOIN
	tb_categoria AS categoria
ON
  categoria.id_categoria = 19
INNER JOIN
	tb_fornecedor AS fornecedor
ON
  fornecedor.id_fornecedor = 7;

--retorna descrição de categoria/fornecedor
SELECT 
	produto.descricao,		
	categoria.descricao,	
	fornecedor.nome
FROM 
	tb_produto AS produto
INNER JOIN
	tb_categoria AS categoria
ON
  categoria.id_categoria = produto.id_categoria
INNER JOIN
	tb_fornecedor AS fornecedor
ON
  fornecedor.id_fornecedor = produto.id_fornecedor;

--GROUP BY
SELECT id_categoria FROM tb_produto GROUP BY id_categoria;

--COUNT
SELECT 
	COUNT(id_categoria),
	id_categoria
FROM 
	tb_produto 
GROUP BY id_categoria;

-- MAX
SELECT 
	MAX(id_categoria)
FROM 
	tb_produto 
--MIN
SELECT 
	MIN(id_categoria)
FROM 
	tb_produto 


