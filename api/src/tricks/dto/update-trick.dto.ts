import { PartialType } from '@nestjs/swagger';
import { CreateTrickDto } from './create-trick.dto';

export class UpdateTrickDto extends PartialType(CreateTrickDto) {}
