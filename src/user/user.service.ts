import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
  async getUserById(id: number) {
    let user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`user id ${id} does not exist`);
    }
    return user;
  }
  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    await this.getUserById(id);
    return this.userRepository.update(id, updateUserDto);
  }
  async deleteUserById(id: number) {
    await this.getUserById(id);
    return this.userRepository.delete(id);
  }
  addUser(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }
}
