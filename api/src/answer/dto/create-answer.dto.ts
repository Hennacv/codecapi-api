import { IsNotEmpty } from "class-validator";

export class CreateAnswerDto {
    @IsNotEmpty()
    blocks: Block[];

    @IsNotEmpty()
    questionId: number;
}
