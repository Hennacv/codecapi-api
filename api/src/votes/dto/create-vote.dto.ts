import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, Validate, ValidateNested } from 'class-validator';
import { OneOfValidator } from '../../validators/one-of-validator';

class UserIdDto {
  @IsInt()
  id: number;
}

export class CreateVoteDto {
  @IsNotEmpty()
  @Validate(OneOfValidator, ['upvote'])
  type: string;

  @IsArray()
  @ValidateNested()
  @Type(() => UserIdDto)
  users: UserIdDto[] = [];

  @IsOptional()
  @IsNumber()
  questionId?: number;

  @IsOptional()
  @IsNumber()
  answerId?: number;
}
