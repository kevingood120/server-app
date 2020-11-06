import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { Connection } from 'typeorm';
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { EquipmentModule } from './equipment/equipment.module';
import { ProductGroupModule } from './product-group/product-group.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CustomerModule, AddressModule, ProductModule, BrandModule, UserModule, TaskModule, EquipmentModule, ProductGroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
