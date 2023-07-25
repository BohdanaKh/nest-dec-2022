import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { UserService } from './user/user.service';
import { ProductService } from './product/product.service';

@Module({
  imports: [UserModule, ProductModule],
  controllers: [AppController, UserController, ProductController],
  providers: [AppService, UserService, ProductService],
})
export class AppModule {}
