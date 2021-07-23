import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StrategyReadService, StrategyWriteService } from './strategy.service';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';

@Controller('strategy')
export class StrategyController {
  constructor(
    private readonly strategyReadService: StrategyReadService,
    private readonly strategyWriteService: StrategyWriteService,
  ) {}

  @Post()
  create(@Body() createStrategyDto: CreateStrategyDto) {
    return this.strategyReadService.create(createStrategyDto);
  }

  @Get()
  findAll() {
    return this.strategyReadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.strategyReadService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStrategyDto: UpdateStrategyDto,
  ) {
    return this.strategyReadService.update(+id, updateStrategyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.strategyReadService.remove(+id);
  }
}
