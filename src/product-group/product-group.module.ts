import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductGroupController } from './product-group.controller';
import ProductGroup from './product-group.entity';
import { ProductGroupService } from './product-group.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductGroup])],
  controllers: [ProductGroupController],
  providers: [ProductGroupService]
})
export class ProductGroupModule {}
