import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.model";

@Entity({ name: 'plays' })
export class Play {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    league_num: string;

    @Column({ nullable: false })
    week_num: string;

    @Column({ nullable: false})
    home: string;

    @Column({ nullable: false})
    away: string;

    @ManyToOne(type => User)
    user: User;

    @PrimaryColumn()
    prediction: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}