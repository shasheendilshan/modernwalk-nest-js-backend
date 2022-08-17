import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  GetAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('/:id')
  GetUserById(@Param('id') id: string) {
    console.log('id :', id);
    return this.userService.getUserById(id);
  }
  @Post()
  AddUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }
}
