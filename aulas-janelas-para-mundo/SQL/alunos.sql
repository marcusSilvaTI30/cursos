-- COMANDOS DDL
-- Comando para criação das tabelas no banco
CREATE TABLE pessoas (
  id serial PRIMARY KEY,
  nome varchar(50),
  sexo char(1),
  nascimento date
);

CREATE TABLE contatos (
  id serial PRIMARY KEY,
  telefone varchar(20),
  email varchar(100),
  pessoa_id int not null, FOREIGN KEY (pessoa_id) REFERENCES pessoas (id)
);

--Comando para atualizar a estrutura de uma tabela
ALTER TABLE pessoas DROP sexo;

ALTER TABLE pessoas ADD sexo varchar(1);

ALTER TABLE pessoas
  ALTER COLUMN sexo TYPE varchar(10);

--Comando para remover tabela do banco
DROP TABLE pessoas;

--Comandos DML
-- Comando para inserir registros nas tabelas
INSERT INTO
	pessoas
VALUES
	(01, 'Marcus', 'M', '1991-12-22'),
	(02, 'Carol',  'F',  '1988-01-31'),
	(03, 'Eliane',  'F',  '2000-02-25'),
	(04, 'Lamonyer',  'F',  '1988-04-17'),
	(05, 'Francisco',  'M',  '2000-05-16'),
	(06, 'Maurício',  'M',  '1999-02-14'),
	(07, 'Romulo',  'M',  '1998-01-21'),
	(08, 'Junior',  'M',  '1958-11-01');

INSERT INTO 
	contatos 
VALUES 
	(1, '(31)3333-3333', 'maria@irias.com.br', 1),
	(2, '(31)99999-9999', 'joao@irias.com.br', 2);

-- Comando para atualizar um registro na tabela
UPDATE
	pessoas
SET
	nome='Marcus Vinicius Dias'
WHERE
	id=1;

-- Comando para remover um registro na tabela
DELETE FROM pessoas WHERE id=1;

-- COMANDOS DQL
--Comando para buscar registros no banco
SELECT
	*
FROM
	pessoas

SELECT
	nome, nascimento
FROM
	pessoas;

SELECT
	*
FROM
	pessoas 
ORDER BY nome DESC;

SELECT
	*
FROM
	pessoas 
WHERE
	id
BETWEEN
	1
AND
	5
ORDER BY nome DESC;

SELECT 
	ps.id, ps.nome, ps.sexo, ps.nascimento, ct.telefone, ct.email 
FROM 
	pessoas AS ps 
INNER JOIN 
	contatos AS ct 
ON 
	ps.id = ct.pessoa_id;

SELECT	
	* 
FROM	
	pessoas
 WHERE  
 	id=1 OR nome='Beatriz';


