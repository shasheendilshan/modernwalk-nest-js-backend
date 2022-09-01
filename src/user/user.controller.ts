import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  //get all users
  // @Get()
  // @ApiOperation({ summary: 'Get all users' })
  // getAllUsers() {
  //   return this.userService.getAllUsers();
  // }

  // get all users for tenant
  @Get()
  @ApiOperation({ summary: 'Get all users for tenant' })
  getAllUsersForTenant(@Query('tenantId') tenantId: number) {
    return this.userService.getAllUsersForTenant(tenantId);
  }

  //get user by id
  @ApiBearerAuth()
  @Get('/:id')
  @ApiOperation({ summary: 'Get user using Id' })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  //delete user
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user using Id' })
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }

  //update user by id
  @ApiBearerAuth()
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
