import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  getAllUsers() {
    return 'get all users from db';
  }
  getUserById(id: string) {
    return { id };
  }
  updateUserById(updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }
  addUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
