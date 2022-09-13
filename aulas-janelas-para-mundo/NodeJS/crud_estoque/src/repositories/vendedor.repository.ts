import db from "../db";
import DatabaseError from "../models/errors/database.error.model";
import Vendedor from "../models/vendedor.model";

class VendedorRepository {

    async findAll() {
        const sql = `
            SELECT 
                nome
            FROM
                tb_vendedor
        `;

        const { rows } = await db.query<Vendedor>(sql);

        return rows || [];
    }

    async findById(id: string) {
        try {
            const sql = `        
                SELECT 
                    nome
                FROM
                    tb_vendedor
                WHERE id_vendedor = $1
                `;

            const valores = [id];

            const { rows } = await db.query<Vendedor>(sql, valores);
            const [user] = rows;

            return user;
        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error);
        }


    }

    async save(vendedor: Vendedor) :Promise<string> {
        const sql = `
            INSERT INTO tb_vendedor (                
                nome
            )
            VALUES 
                ($1)
            RETURNING id_vendedor
        `;

        const valores = [vendedor.nome];

        const { rows } = await db.query<{ id: string }>(sql, valores);
        const [ novoVendedor ] = rows;

        return novoVendedor.id;
    }

    async update(vendedor: Vendedor) : Promise<void> {
        const sql = `
            UPDATE 
                tb_vendedor 
            SET 
                nome = $1
            WHERE 
                id_vendedor = $2
        `;

        const valores = [vendedor.nome, vendedor.id_vendedor];
        await db.query(sql, valores);

    }

    async delete(id: string) : Promise<void> {
        const sql = `
            DELETE
            FROM 
                tb_vendedor
            WHERE 
                id_vendedor = $1
        `;
        const valores = [id];
        await db.query(sql, valores);
    }
}

export default new VendedorRepository();