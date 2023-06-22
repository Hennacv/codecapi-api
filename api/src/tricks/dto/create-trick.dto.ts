import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrickDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  blocks: Block[];
}
