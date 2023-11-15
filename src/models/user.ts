import { Entity, Column } from "typeorm";

@Entity()
export default class User {
    // @PrimaryGeneratedColumn()
    // id: number;

    @Column({ length: 100 })
    public readonly usuario: string;

    @Column({ length: 100 })
    public readonly email: string;
    
    @Column({ length: 50 })
    public readonly password: string;

    constructor(usuario: string, email: string, password: string) {
        // this.id = id;
        this.usuario = usuario,
        this.email = email,
        this.password = password
    }
}