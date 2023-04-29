import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'baby' })
export class Baby {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false})
    league_num: string;

    @Column({ nullable: false})
    week_num: string;

    @Column({ nullable: false})
    home: string;

    @Column({ nullable: false})
    away: string;

    @Column({ nullable: false})
    home_odd: string;

    @Column({ nullable: false})
    home_draw_odd: string;

    @Column({ nullable: false})
    away_odd: string;

    @Column({ nullable: false})
    draw_odd: string;

    @Column({ nullable: false})
    away_draw_odd: string;

    @Column({ nullable: false})
    any_body_odd: string;

    @Column({ nullable: false})
    gg_odd: string;

    @Column({ nullable: false})
    ng_odd: string;

    @Column({ nullable: false})
    over_2: string;

    @Column({ nullable: false})
    under_2: string;

    @Column({ nullable: false})
    result: string;

    @Column({ nullable: false})
    home_form: string;

    @Column({ nullable: false})
    away_form: string;

    @Column({ nullable: false})
    home_pos: number;

    @Column({ nullable: false})
    away_pos: number;

    @Column({ nullable: false})
    home_point: number;

    @Column({ nullable: false})
    away_point: number;

    @Column({ nullable: false})
    createAt: Date;

}