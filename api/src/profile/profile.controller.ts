import { Controller, Get, Param, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  findAll(@Param('id') id: number) {
   return this.profileService.findAll(id);
  }
}
