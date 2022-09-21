import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createClass1663087519322 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'class',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true                    
                },
                {
                    name: 'name',
                    type: 'varchar'
                }
            ]

        })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('class')
    }

}
