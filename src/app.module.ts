import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
import { PredictionModule } from './predictions/prediction.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    PredictionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
