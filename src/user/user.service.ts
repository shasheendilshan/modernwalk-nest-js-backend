import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  getAllUsers() {
    return 'get all users from db';
  }
  getUserById(id: string) {
    return { id };
  }
  addUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
