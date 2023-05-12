import { IsNotEmpty } from 'class-validator';

export class UpdateAnswerDto {
    @IsNotEmpty()
    blocks: Block[];
}
