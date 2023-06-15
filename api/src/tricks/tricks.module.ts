import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tricks } from '../db/entities/tricks.entity';
import { TrickController } from './tricks.controller';
import { TrickService } from './tricks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tricks])],
  controllers: [TrickController],
  providers: [TrickService],
  exports: [TrickService],
})
export class TricksModule {}