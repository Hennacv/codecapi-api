import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAnnouncementDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  blocks: Block[];
}