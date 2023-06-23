import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user.entity';
import { Announcements } from '../db/entities/announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcements)
    private repo: Repository<Announcements>,
  ) {}

  async create(createAnnouncementDto: CreateAnnouncementDto, user: User) {
    let announcement = this.repo.create({ ...createAnnouncementDto, userId: user.id });
    await announcement.save();
    return this.fetchAnnouncement(announcement.id);
  }

  async update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    const announcement= await this.fetchAnnouncement(id);
    Object.assign(announcement, updateAnnouncementDto);
    announcement.save();
    return announcement;
  }

  async remove(id: number) {
    const announcement = await Announcements.findOneByOrFail({ id });
    await this.repo.remove(announcement);
  }

  async findAll() {
    const announcements = await Announcements.find({
      relations: ['user'],
      order: {
        createdAt: 'desc',
      },
    });
    return announcements;
  }

  async findOne(id: number) {
    return await this.fetchAnnouncement(id);
  }

  async fetchAnnouncement(id: number) {
    return await Announcements.findOneOrFail({
      where: { id },
      relations: ['user'],
    });
  }
}