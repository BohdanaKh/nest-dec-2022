import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async getUserList() {
    return this.userService.getAllUsers();
  }

  @Post('account/create')
  async createUserAccount(@Req() req: any, @Body() body: UserCreateDto) {
    return this.userService.createUserAccount(body);
  }

  @Get(':userId')
  async getUserProfile(@Param('userId') id: string) {
    return this.userService.getOneUserAccount(id);
  }

  @Delete(':userId')
  async deleteUserAccount(@Param('userId') id: string) {
    return this.userService.deleteUserAccount(id);
  }

  @Patch(':userId')
  async updateUserProfile(@Param('userId') id: string, @Body() body: any) {
    return this.userService.updateUserAccount(id, body);
  }
}
