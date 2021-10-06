import { Module } from '@nestjs/common';
import { CronService } from './service/cron.service';

@Module({
  imports: [],
  providers: [CronService],
})
export class CronModule {}
