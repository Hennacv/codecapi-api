import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

class TagIdDto {
  @IsInt()
  id: number;
}

export class CreateQuestionDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  blocks: Block[];

  @IsArray()
  @ValidateNested()
  @Type(() => TagIdDto)
  tags: TagIdDto[] = [];
}
