import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, Index, OneToOne, JoinTable, JoinColumn, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { Config } from "./config.model";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @ManyToOne((type) => Config)
    config: Config;

    @Column({ nullable: false, default: true})
    play: boolean;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: false})
    amount: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}