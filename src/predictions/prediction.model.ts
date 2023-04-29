import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity({ name: 'predictions' })
export class Prediction {
    @PrimaryColumn()
    home: string;

    @PrimaryColumn()
    away: string;

    @PrimaryColumn()
    type: string;

    @Column({ type: 'numeric', precision: 15, scale: 7, default: 0.0 })
    probability: number;

    @Column({ type: 'numeric', precision: 15, scale: 2, default: 0.0 })
    percentage_win: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}