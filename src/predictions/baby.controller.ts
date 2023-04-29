import { Controller, Get, Inject, Post, Req } from "@nestjs/common";
import { PredictionService } from "./prediction.service";

@Controller('/v1')
export class BabyController {
    constructor(
        @Inject(PredictionService)
        private babyService: PredictionService
    ){}

    @Get('/pin-123/users')
    async fetchTrips(@Req() data: any): Promise<any> {
      return this.babyService.getUsers();
    }

    @Post('/pin-123/predictions')
    async fetchPredictions(@Req() data: any): Promise<any> {
      return this.babyService.getPredictions(data.body.fixtures);
    }
}