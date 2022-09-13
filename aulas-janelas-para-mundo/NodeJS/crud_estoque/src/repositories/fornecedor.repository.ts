import db from "../db";
import DatabaseError from "../models/errors/database.error.model";
import Fornecedor from "../models/fornecedor.model";

class FornecedorRepository {

    async findAll() {
        const sql = `
            SELECT 
              id_fornecedor, nome, cnpj
            FROM
                tb_fornecedor
        `;

        const { rows } = await db.query<Fornecedor>(sql);

        return rows || [];
    }

    async findById(id: string) {
        try {
            const sql = `        
                SELECT 
                    id_fornecedor, nome, cnpj
                FROM
                    tb_fornecedor
                WHERE 
                    id_fornecedor = $1
                `;

            const valores = [id];

            const { rows } = await db.query<Fornecedor>(sql, valores);
            const [fornecedor] = rows;

            return fornecedor;
        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error);
        }


    }

    async save(fornecedor: Fornecedor) :Promise<string> {
        const sql = `
            INSERT INTO tb_fornecedor (                
                cnpj, nome
            )
            VALUES 
                ($1, $2)
            RETURNING 
                id_fornecedor
        `;

        const valores = [fornecedor.cnpj, fornecedor.nome];

        const { rows } = await db.query<{ id: string }>(sql, valores);
        const [ novoFornecedor ] = rows;

        return novoFornecedor.id;
    }

    async update(fornecedor: Fornecedor) : Promise<void> {
        const sql = `
            UPDATE 
                tb_fornecedor 
            SET 
                cnpj = $1,nome = $2                
            WHERE 
                id_fornecedor = $3
        `;

        const valores = [fornecedor.cnpj, fornecedor.nome, fornecedor.id_fornecedor];
        await db.query(sql, valores);

    }

    async delete(id: string) : Promise<void> {
        const sql = `
            DELETE
            FROM 
                tb_fornecedor
            WHERE 
                id_fornecedor = $1
        `;
        const valores = [id];
        await db.query(sql, valores);
    }

}

export default new FornecedorRepository();