import db from "../db";
import DatabaseError from "../models/errors/database.error.model";
import Categoria from "../models/categoria.model";

class CategoriaRepository {

    async findAll() {
        const sql = `
            SELECT 
                id_categoria, descricao
            FROM
                tb_categoria
        `;

        const { rows } = await db.query<Categoria>(sql);

        return rows || [];
    }

    async findById(id: string) {
        try {
            const sql = `        
                SELECT 
                    descricao
                FROM
                    tb_categoria
                WHERE 
                    id_categoria = $1
                `;

            const valores = [id];

            const { rows } = await db.query<Categoria>(sql, valores);
            const [user] = rows;

            return user;
        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error);
        }


    }

    async save(categoria: Categoria) :Promise<string> {
        console.log(categoria)
        const sql = `
            INSERT INTO tb_categoria (                
                descricao
            )
            VALUES 
                ($1)
            RETURNING 
                id_categoria
        `;

        const valores = [categoria.descricao];

        const { rows } = await db.query<{ id: string }>(sql, valores);
        const [ novaCategoria ] = rows;

        return novaCategoria.id;
    }

    async update(categoria: Categoria) : Promise<void> {
        const sql = `
            UPDATE 
                tb_categoria 
            SET 
                descricao = $1
            WHERE 
                id_categoria = $2
        `;

        const valores = [categoria.descricao, categoria.id_categoria];
        await db.query(sql, valores);

    }

    async delete(id: string) : Promise<void> {
        const sql = `
            DELETE
            FROM 
                tb_categoria
            WHERE 
                id_categoria = $1
        `;
        const valores = [id];
        await db.query(sql, valores);
    }

}

export default new CategoriaRepository();