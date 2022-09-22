import {Entity,Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('tb_usuarios')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable:false})
    nome: string;
}
