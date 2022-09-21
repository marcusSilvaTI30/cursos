import {Entity,Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('tb_categoria')
export class Class {

    @PrimaryGeneratedColumn()   
    id_categoria: number;

    @Column({length: 100, nullable:false}) 
    descricao: string;
}
