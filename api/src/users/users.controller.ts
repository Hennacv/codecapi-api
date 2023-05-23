import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AddTagDto } from '../questions/dto/add-tag.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.usersService.findOne(uid);
  }

  @Post(':uid/tags')
  addTag(@Param('uid') uid: string, @Body() addTagDto: AddTagDto) {
    return this.usersService.addTag(uid, addTagDto);
  }

  @Delete(':uid/tags/:tagId')
  removeTag(@Param('uid') uid: string, @Param('tagId') tagId: number) {
    return this.usersService.removeTag(uid, tagId);
  }
}
