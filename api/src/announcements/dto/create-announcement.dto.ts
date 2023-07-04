import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAnnouncementDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  type: string;

  @IsOptional()
  blocks: Block[];

  @IsOptional()
  date: string;

  @IsOptional()
  time: string;

  @IsOptional()
  location: string;

  @IsOptional()
  image: string;
}