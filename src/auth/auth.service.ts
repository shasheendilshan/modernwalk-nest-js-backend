import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './../user/user.service';

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
    if (user.password !== loginAuthDto.password)
      throw new UnauthorizedException('Credentials incorrect');
    return user;
  }
}
