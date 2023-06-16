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

  @IsOptional()
  description: string;

  @IsOptional()
  jobtitle: string;

  @IsOptional()
  team: string;

  @IsArray()
  @ValidateNested()
  @Type(() => TagIdDto)
  tags: TagIdDto[] = [];
}
