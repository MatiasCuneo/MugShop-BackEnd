import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    usuario!: string;

    @Column({ length: 100 })
    email!: string;
    
    @Column({ length: 50 })
    password!: string;
}