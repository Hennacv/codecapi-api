import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { OneOfValidator } from '../../validators/one-of-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  @Validate(OneOfValidator, ['upvote'])
  type: string;

  @IsNotEmpty()
  userId: number;

  @IsOptional()
  questionId: number;

  @IsOptional()
  answerId: number;

  @IsOptional()
  tricksId: number;
}
