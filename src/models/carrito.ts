import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    cart: string;

    constructor(cart: string) {
        this.cart = cart;
    }
}
