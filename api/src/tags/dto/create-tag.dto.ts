import { Transform } from 'class-transformer';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  title: string;

  @Matches('#([a-f0-9]{3}|[a-f0-9]{6})$') 
  @Transform(({ value }) => value.toLowerCase())
  color: string;
}