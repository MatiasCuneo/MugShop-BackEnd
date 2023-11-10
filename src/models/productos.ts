import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Producto {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 100 })
    nombre!: string

    @Column({ length: 100 })
    modelo!: string

    @Column({ length: 100 })
    pais!: string

    @Column("double")
    precio!: number
}