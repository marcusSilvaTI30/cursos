import db from "../db";
import DatabaseError from "../models/errors/database.error.model";
import Produto from "../models/produto.model";

class ProdutoRepository {

    async findAll() {
        const sql = `
            SELECT 
                produto.id_produto,
                produto.descricao,
                produto.preco_unitario,
                produto.quantidade_estoque,
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
        `;

        const { rows } = await db.query<Produto>(sql);

        return rows || [];
    }

    async findById(id: string) {
        try {
            const sql = `        
            SELECT 
                produto.id_produto,
                produto.descricao,
                produto.preco_unitario,
                produto.quantidade_estoque,
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
                fornecedor.id_fornecedor = produto.id_fornecedor
            WHERE
                produto.id_produto=$1;
            `;

            const valores = [id];

            const { rows } = await db.query<Produto>(sql, valores);
            const [produto] = rows;

            return produto;
        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error);
        }


    }

    async save(produto: Produto): Promise<string> {
        const sql = `
            INSERT INTO tb_produto (                
                descricao, preco_unitario, quantidade_estoque, id_categoria, id_fornecedor)
            VALUES
                ($1, $2, $3, $4, $5)
            RETURNING 
                id_produto
            `;

        const valores = [
            produto.descricao,
            produto.preco_unitario,
            produto.quantidade_estoque,
            produto.categoria?.id_categoria,
            produto.fornecedor?.id_fornecedor
        ];

        const { rows } = await db.query<{ id: string }>(sql, valores);

        const [novoProduto] = rows;
        console.log(sql);
        console.log(novoProduto);

        return novoProduto.id;
    }

    async update(produto: Produto): Promise<void> {
        const sql = `
            UPDATE 
                tb_produto 
            SET 
                descricao=$1, preco_unitario=$2,
                quantidade_estoque=$3, id_categoria=$4,
                id_fornecedor=$5
            WHERE 
                id_produto = $6
        `;

        const valores = [
            produto.descricao,
            produto.preco_unitario,
            produto.quantidade_estoque,
            produto.categoria?.id_categoria,
            produto.fornecedor?.id_fornecedor,
            produto.id_produto
        ];

        await db.query(sql, valores);

    }

    async delete(id: string): Promise<void> {
        const sql = `
            DELETE
            FROM 
                tb_produto
            WHERE 
                id_produto = $1
        `;
        const valores = [id];
        await db.query(sql, valores);
    }
}

export default new ProdutoRepository();