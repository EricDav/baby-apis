import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'configs' })
export class Config {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    password: string;

    @Column({ nullable: false})
    username: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}