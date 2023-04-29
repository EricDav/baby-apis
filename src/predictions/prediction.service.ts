import { EntityManager, Repository } from "typeorm";
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import * as converter from 'json-2-csv';
import axios from 'axios';

import { Baby } from "./baby.model";
import { Prediction } from './prediction.model';
import { User } from './user.model';

import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { evaluate, getFormPoint, GOAL_GOAL, handleErrorCatch, NO_GOAL_GOAL, OVER_2_POINT_5, UNDER_2_POINT_5 } from "../util/helper";

@Injectable()
export class PredictionService {
    private babyRepository: Repository<Baby>;
    private predictionRepo: Repository<Prediction>;
    private userRepo: Repository<User>;
    constructor(
        private readonly entityManager: EntityManager,
    ) {
        this.babyRepository = this.entityManager.getRepository(Baby);
        this.predictionRepo = this.entityManager.getRepository(Prediction);
        this.userRepo = this.entityManager.getRepository(User);
    }

    async getUsers() {
        try {
            return this.userRepo.find({
                relations: ['config']
            });
        } catch(err) {
            handleErrorCatch(err);
        }
    }

    async getStat(home, away, outcome) {
        try {
            const data = await this.babyRepository.find({
                where: {
                    home,
                    away
                },
                order: {
                    'createAt': 'desc'
                }
            });

            let odds = 0;
            switch (outcome) {
                case GOAL_GOAL:
                    odds = Number.parseFloat(data[0].gg_odd);
                    break;
                case OVER_2_POINT_5:
                    odds = Number.parseFloat(data[0].over_2);
                    break;
                case UNDER_2_POINT_5:
                    odds = Number.parseFloat(data[0].under_2);
                    break
                case NO_GOAL_GOAL:
                    odds = Number.parseFloat(data[0].gg_odd);
                    break
                default:
                    odds = 1
            }
           
            let outcomeCount = 0;
            data.forEach((d) => {
                if (evaluate(d.result, outcome)) {
                    outcomeCount+=1;
                }
            });

            return {
                probability: outcomeCount/data.length,
                percentageWin: (outcomeCount * (odds - 1)) - (data.length - outcomeCount)
            } 
        } catch(err) {
            console.log(err.message)
        }
    }

    async getPredictions(fixtures) {
        try {
            const predictions = await this.predictionRepo
                .createQueryBuilder('prediction')
                .where(`prediction.percentage_win > 11`)
                .orderBy({
                    'percentage_win': 'DESC'
                })
                .getMany();
            const predicts = [];
            for await (const fix of fixtures) {
                const prediction = predictions.find((p) => {
                    return p.home === fix.homeTeam && p.away === fix.awayTeam
                });

                if (!prediction) continue;

                let preType = prediction.type;
                if (preType === OVER_2_POINT_5) {
                    preType = 'over2'
                } else if (preType === UNDER_2_POINT_5) {
                    preType = 'under2';
                }
                predicts.push({
                    homeTeam: prediction.home,
                    awayTeam: prediction.away,
                    prediction: preType 
                })
            }

            return predicts;
        } catch(err) {
            Logger.error(err.message)
            handleErrorCatch(err);
        }
    }

    async savePrediction(outcome) {
        try {
            const teams = ['WHU', 'CRY', 'LEI', 'EVE', 'FOR', 'CHE', 'FUL', 'BRI', 'BOU', 'MNC',
                           'BRN', 'ASV', 'WOL', 'LEE', 'SOU', 'MNU', 'ARS', 'TOT', 'NWC', 'LIV']
            for await (const t of teams) {
                const rounds = []
                for await (const p of teams) {
                    if (t == p) continue;
                    const stat = await this.getStat(t, p, outcome);
                    rounds.push({
                        home: t,
                        away: p,
                        probability: stat.probability,
                        percentage_win: stat.percentageWin,
                        type: outcome
                    })
                }

                await Promise.all(rounds.map((round) => this.predictionRepo.save(round)))
            }
        } catch(err) {}
    }

    async getFixturesStat(outcome) {
        try {
            // http://139.162.241.4/baby/fixtures'
            const { data }  = await axios.get('http://localhost:4000/baby/fixtures')

            const predicts = [];
            // for await ( const datum of data.data.fixtures) {
            //     const stat = await this.getStat(datum.homeTeam, datum.awayTeam, 'GG', null);
            //     const point = stat.probability * Number.parseFloat(datum.GG);
            //     datum.ggStat = stat;
            //     datum.point = point
            //     if (datum.GG < datum.NG) {
            //         predicts.push(datum);
            //     }
            // }

            let smallest = { point: 100 };
            let secondSmallest = { point: 100 };

            let biggest = { point: 0 };
            let secondBiggest = { point: 0 };

            predicts.forEach((pred) => {
                if (pred.point < smallest.point) {
                    smallest = pred;
                } else if (pred.point < secondSmallest.point)  {
                    secondSmallest = pred;
                }

                if (pred.point > biggest.point) {
                    biggest = pred;
                } else if (pred.point > secondBiggest.point)  {
                    secondBiggest = pred;
                }
            })

        } catch(err) {
            console.log(err.message)
        }
        
    }

    // @Timeout(3000)
    async getBabyData() {
        console.log(await this.getPredictions(null));
    }

    async updateAmount(data) {
        try {
            const user = await this.userRepo.findOne({
                where: {
                    id: data.userId
                }
            });

            if (!user) {
                throw new HttpException(
                    {
                      status: HttpStatus.BAD_REQUEST,
                      error: `user with id ${data.userId} not found`,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
            await this.userRepo.save({
                id: data.userId,
                amount: data.amount
            });
        } catch(err) {
            handleErrorCatch(err);
        }
    }

    async togglePlay(data) {
        try {
            const user = await this.userRepo.findOne({
                where: {
                    id: data.userId
                }
            });

            if (!user) {
                throw new HttpException(
                    {
                      status: HttpStatus.BAD_REQUEST,
                      error: `user with id ${data.userId} not found`,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }

            await this.userRepo.save({
                id: data.userId,
                play: !user
            });
        } catch(err) {
            handleErrorCatch(err);
        }
    }
}
