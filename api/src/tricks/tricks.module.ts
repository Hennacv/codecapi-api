import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trick } from '../db/entities/trick.entity';
import { TrickController } from './tricks.controller';
import { TrickService } from './tricks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trick])],
  controllers: [TrickController],
  providers: [TrickService],
  exports: [TrickService],
})
export class TricksModule {}