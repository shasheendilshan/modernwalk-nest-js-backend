import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  //get all users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  //get user by id
  @Get('/:id')
  @ApiOperation({ summary: 'Get user using Id' })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  //delete user
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user using Id' })
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }

  //update user by id
  @Patch('/:id')
  @ApiOperation({ summary: 'Update user using Id' })
  updateUserById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  //add user
  @Post()
  @ApiOperation({ summary: 'Create user' })
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }
}
