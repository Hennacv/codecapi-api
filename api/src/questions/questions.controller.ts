import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AddTagDto } from './dto/add-tag.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';

@ApiTags('Questions')
@ApiBearerAuth()
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: Request) {
    return this.questionsService.create(createQuestionDto, req['user']);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body()
    updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.questionsService.remove(id);
  }

  @Post(':id/tags')
  addTag(@Param('id') id: number, @Body() addTagDto: AddTagDto) {
    return this.questionsService.addTag(id, addTagDto);
  }

  @Delete(':id/tags/:tagId')
  removeTag(@Param('id') id: number, @Param('tagId') tagId: number) {
    return this.questionsService.removeTag(id, tagId);
  }
}
