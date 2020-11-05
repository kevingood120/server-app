import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentController } from './equipment.controller';
import Equipament from './equipment.entity';
import { EquipmentService } from './equipment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equipament])],
  controllers: [EquipmentController],
  providers: [EquipmentService]
})
export class EquipmentModule {}
