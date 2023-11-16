import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Producto {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 45 })
    nombre: string

    @Column({ length: 45 })
    modelo: string

    @Column({ length: 45 })
    pais: string

    @Column("double")
    precio: number

    constructor(nombre: string, modelo: string, pais: string, precio: number) {
        this.nombre = nombre;
        this.modelo = modelo;
        this.pais = pais;
        this.precio = precio;
    }
}