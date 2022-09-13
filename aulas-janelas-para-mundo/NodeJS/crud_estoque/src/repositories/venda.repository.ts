import db from "../db";
import Categoria from "../models/categoria.model";
import DatabaseError from "../models/errors/database.error.model";
import Fornecedor from "../models/fornecedor.model";
import Venda from "../models/venda.model";
import Vendedor from "../models/vendedor.model";

class VendaRepository {

    categoria?: Categoria;
    fornecedor?: Fornecedor;

    async findAll() {
        const sql = `
        SELECT
            vp.cod_fiscal,
            v.data_venda,
            v.id_cliente,
            c.nome,
            v.id_vendedor,
            vendedor.nome,
            vp.id_produto,
            p.descricao,
            p.preco_unitario,
            v.quantidade_venda,
            v.valor_total,
            pag.descr_pagamento
        FROM 
            tb_venda_has_produto AS vp
        INNER JOIN
            tb_produto AS p
        ON
            p.id_produto = vp.id_produto
        INNER JOIN
            tb_venda AS v
        ON
            v.id_venda = vp.id_venda
        INNER JOIN
            tb_cliente AS c
        ON
            v.id_cliente = c.id_cliente
        INNER JOIN
            tb_vendedor AS vendedor
        ON
            v.id_vendedor = vendedor.id_vendedor
        INNER JOIN
            tb_pagamento AS pag
        ON
            v.id_pagamento = pag.id_pagamento
        `;

        const { rows } = await db.query<Vendedor>(sql);

        return rows || [];
    }

    async findById(id: string) {
        try {
            const sql = `        
            SELECT
                vp.cod_fiscal,
                v.data_venda,
                v.id_cliente,
                c.nome,
                v.id_vendedor,
                vendedor.nome,	
                vp.id_produto,
                p.descricao,
                p.preco_unitario,
                v.quantidade_venda,
                v.valor_total,
                pag.descr_pagamento
            FROM 
                tb_venda_has_produto AS vp
            INNER JOIN
                tb_produto AS p
            ON
                p.id_produto = vp.id_produto
            INNER JOIN
                tb_venda AS v
            ON
                v.id_venda = vp.id_venda
            INNER JOIN
                tb_cliente AS c
            ON
                v.id_cliente = c.id_cliente
            INNER JOIN
                tb_vendedor AS vendedor
            ON
                v.id_vendedor = vendedor.id_vendedor
            INNER JOIN
                tb_pagamento AS pag
            ON
                v.id_pagamento = pag.id_pagamento
            WHERE
                vp.cod_fiscal = $1;            
            `;

            const valores = [id];

            const { rows } = await db.query<Vendedor>(sql, valores);
            const [produto] = rows;

            return produto;
        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error);
        }
    }

    async save(venda: Venda): Promise<void> {
        const sql = `
            WITH data
                (valor_total, id_cliente, id_vendedor, id_pagamento, id_produto, cod_fiscal, qtd_unidade) AS (
                    VALUES    	      
                ($1::integer, $2::integer, $3::integer, $4::integer, $5::integer, $6, $7::integer)
            ), 
            ins1 AS (
                INSERT INTO tb_venda
                    (quantidade_venda, valor_total, id_cliente, id_vendedor, id_pagamento)
                SELECT 
                    qtd_unidade::integer, valor_total::integer, id_cliente::integer, id_vendedor::integer, id_pagamento::integer
                FROM 
                    data
                RETURNING 
                    id_venda, valor_total, id_vendedor, id_pagamento
                )            
            INSERT INTO tb_venda_has_produto 
                (id_venda, id_produto, cod_fiscal)
            SELECT
                ins1.id_venda, d.id_produto, d.cod_fiscal
            FROM   
                data d
            JOIN  
                ins1 
            USING 
                (valor_total, id_vendedor, id_pagamento)
        
            `;

        const valores = [
            venda.valor_total,
            venda.cliente?.id_cliente,
            venda.vendedor?.id_vendedor,
            venda.pagamento?.id_pagamento,
            venda.produto?.id_produto,
            venda.vendaHasProduto?.cod_fiscal,
            venda.quantidade_venda
        ];

        const { rows } = await db.query(sql, valores);
        const [novaVenda] = rows;

    }
}

export default new VendaRepository();