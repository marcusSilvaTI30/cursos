import db from "../db";
import DatabaseError from "../models/errors/database.error.model";
import Pagamento from "../models/pagamento.model";

class PagamentoRepository {

    async findAll() {
        const sql = `
            SELECT 
                descr_pagamento
            FROM
                tb_pagamento
        `;

        const { rows } = await db.query<Pagamento>(sql);

        return rows || [];
    }

    async findById(id: string) {
        try {
            const sql = `        
                SELECT 
                    descr_pagamento
                FROM
                    tb_pagamento
                WHERE 
                    id_pagamento = $1
                `;

            const valores = [id];

            const { rows } = await db.query<Pagamento>(sql, valores);
            const [user] = rows;

            return user;
        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error);
        }


    }

    async save(pagamento: Pagamento) :Promise<string> {
        const sql = `
            INSERT INTO tb_pagamento (                
                descr_pagamento
            )
            VALUES 
                ($1)
            RETURNING 
                id_pagamento
        `;

        const valores = [pagamento.descr_pagamento];

        const { rows } = await db.query<{ id: string }>(sql, valores);
        const [ novaFormaPagamento ] = rows;

        return novaFormaPagamento.id;
    }

    async update(pagamento: Pagamento) : Promise<void> {
        const sql = `
            UPDATE 
                tb_pagamento 
            SET 
                descr_pagamento = $1
            WHERE 
                id_pagamento = $2
        `;

        const valores = [pagamento.descr_pagamento, pagamento.id_pagamento];
        await db.query(sql, valores);

    }

    async delete(id: string) : Promise<void> {
        const sql = `
            DELETE
            FROM 
                tb_pagamento
            WHERE 
                id_pagamento = $1
        `;
        const valores = [id];
        await db.query(sql, valores);
    }

}

export default new PagamentoRepository();