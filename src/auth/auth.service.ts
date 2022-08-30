import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  register(createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }

  async login(loginAuthDto: LoginUserDto) {
    const allUsers = await this.userService.getAllUsers();
    const user = allUsers.find((user) => user.email === loginAuthDto.email);
    if (!user) throw new UnauthorizedException('Credentials incorrect');
    if (!(await bcrypt.compare(loginAuthDto.password, user.password)))
      throw new UnauthorizedException('Credentials incorrect');
    return user;
  }
}
