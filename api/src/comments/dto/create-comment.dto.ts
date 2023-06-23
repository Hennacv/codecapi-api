import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  userId: number;

  @IsOptional()
  answerId: number;

  @IsOptional()
  tricksId: number;
}
