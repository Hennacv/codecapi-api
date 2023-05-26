import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  answerId: number;
}
