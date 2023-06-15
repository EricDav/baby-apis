import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'predictionsHistory' })
export class PredictionHistory {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: false })
    home: string;

    @Column({ nullable: false })
    away: string;

    @Column({ nullable: false })
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