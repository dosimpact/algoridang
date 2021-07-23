import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';

@Controller('strategy')
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

  @Post()
  create(@Body() createStrategyDto: CreateStrategyDto) {
    return this.strategyService.create(createStrategyDto);
  }

  @Get()
  findAll() {
    return this.strategyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.strategyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStrategyDto: UpdateStrategyDto) {
    return this.strategyService.update(+id, updateStrategyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.strategyService.remove(+id);
  }
}
