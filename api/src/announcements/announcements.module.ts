import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcements } from '../db/entities/announcement.entity';
import { AnnouncementController } from './announcements.controller';
import { AnnouncementService } from './announcements.service';

@Module({
  imports: [TypeOrmModule.forFeature([Announcements])],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
  exports: [AnnouncementService],
})
export class AnnouncementsModule {}