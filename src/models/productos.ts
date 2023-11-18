import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Producto {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 45 })
    nombre: string

    @Column({ length: 45 })
    desc: string

    @Column({ length: 45 })
    category: string

    @Column("double")
    precio: number

    @Column({ length: 200 })
    image: string

    constructor(nombre: string, desc: string, category: string, precio: number, image: string) {
        this.nombre = nombre;
        this.desc = desc;
        this.category = category;
        this.precio = precio;
        this.image = image;
    }
}