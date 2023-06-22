import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { AnnouncementService } from './announcements.service';

@ApiTags('Announcements')
@ApiBearerAuth()
@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  create(@Body() createAnnouncementDto: CreateAnnouncementDto, @Req() req: Request) {
    return this.announcementService.create(createAnnouncementDto, req['user']);
  }

  @Get()
  findAll() {
    return this.announcementService.findAll();
  }

}