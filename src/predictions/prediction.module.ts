import { Module } from "@nestjs/common";
import { BabyController } from "./baby.controller";
import { PredictionService } from "./prediction.service";

@Module({
    imports: [],
    controllers: [BabyController],
    providers: [PredictionService],
})
export class PredictionModule {}