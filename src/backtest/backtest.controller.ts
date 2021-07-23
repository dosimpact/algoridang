import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BacktestService } from './backtest.service';
import { CreateBacktestDto } from './dto/create-backtest.dto';
import { UpdateBacktestDto } from './dto/update-backtest.dto';

@Controller('backtest')
export class BacktestController {
  constructor(private readonly backtestService: BacktestService) {}

  @Post()
  create(@Body() createBacktestDto: CreateBacktestDto) {
    return this.backtestService.create(createBacktestDto);
  }

  @Get()
  findAll() {
    return this.backtestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.backtestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBacktestDto: UpdateBacktestDto) {
    return this.backtestService.update(+id, updateBacktestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.backtestService.remove(+id);
  }
}
