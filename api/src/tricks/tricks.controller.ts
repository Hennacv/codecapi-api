import { Controller, Post, Body, Get, Req, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTrickDto } from './dto/create-trick.dto';
import { TrickService } from './tricks.service';
import { Request } from 'express';
import { UpdateTrickDto } from './dto/update-trick.dto';

@ApiTags('Tricks')
@ApiBearerAuth()
@Controller('tricks')
export class TrickController {
  constructor(private readonly trickService: TrickService) {}

  @Post()
  create(@Body() createTrickDto: CreateTrickDto, @Req() req: Request) {
    return this.trickService.create(createTrickDto, req['user']);
  }

  @Get()
  findAll() {
    return this.trickService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.trickService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body()
    updateTrickDto: UpdateTrickDto,
  ) {
    return this.trickService.update(id, updateTrickDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.trickService.remove(id);
  }

}
