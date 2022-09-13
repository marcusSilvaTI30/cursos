import db from "../db";
import DatabaseError from "../models/errors/database.error.model";
import Cliente from "../models/cliente.model";

class ClienteRepository {

    async findAll() {
        const sql = `
            SELECT 
              nome, telefone, email
            FROM
                tb_cliente
        `;

        const { rows } = await db.query<Cliente>(sql);

        return rows || [];
    }

    async findById(id: string) {
        try {
            const sql = `        
                SELECT 
                    nome, telefone, email
                FROM
                    tb_cliente
                WHERE 
                    id_cliente = $1
                `;

            const valores = [id];

            const { rows } = await db.query<Cliente>(sql, valores);
            const [user] = rows;

            return user;
        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error);
        }


    }

    async save(cliente: Cliente) :Promise<string> {
        const sql = `
            INSERT INTO tb_cliente (                
                nome, telefone, email
            )
            VALUES 
                ($1, $2, $3)
            RETURNING 
                id_cliente
        `;

        const valores = [cliente.nome, cliente.telefone, cliente.email];

        const { rows } = await db.query<{ id: string }>(sql, valores);
        const [ novoCliente ] = rows;

        return novoCliente.id;
    }

    async update(cliente: Cliente) : Promise<void> {
        const sql = `
            UPDATE 
                tb_cliente 
            SET 
                nome = $1,
                telefone = $2,
                email = $3
            WHERE 
                id_cliente = $4
        `;

        const valores = [cliente.nome, cliente.telefone, cliente.email, cliente.id_cliente];
        await db.query(sql, valores);

    }

    async delete(id: string) : Promise<void> {
        const sql = `
            DELETE
            FROM 
                tb_cliente
            WHERE 
                id_cliente = $1
        `;
        const valores = [id];
        await db.query(sql, valores);
    }

}

export default new ClienteRepository();