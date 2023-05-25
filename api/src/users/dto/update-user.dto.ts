import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

class TagIdDto {
  @IsInt()
  id: number;
}

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  email: string;

  @IsArray()
  @ValidateNested()
  @Type(() => TagIdDto)
  tags: TagIdDto[] = [];
}
