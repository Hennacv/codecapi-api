import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTrickDto } from './dto/create-trick.dto';
import { TrickService } from './tricks.service';
import { Request } from 'express';

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

}
