import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "json" })
    cart: object;

    constructor(cart: object) {
        this.cart = cart;
    }
}
