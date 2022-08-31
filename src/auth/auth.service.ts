import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  register(createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }

  async login(loginAuthDto: LoginUserDto) {
    const allUsers = await this.userService.getAllUsersForTenant(
      loginAuthDto.tenantId,
    );
    const user = allUsers.find(
      (user) =>
        user.email === loginAuthDto.email &&
        user.tenantId === loginAuthDto.tenantId,
    );

    if (!user) throw new UnauthorizedException('Credentials incorrect');
    if (!(await bcrypt.compare(loginAuthDto.password, user.password)))
      throw new UnauthorizedException('Credentials incorrect');

    const { password, tenant, ...userDetails } = user;

    const jwt = await this.jwtService.signAsync({ userDetails });
    const response = {
      access_token: jwt,
    };
    return response;
  }
}
