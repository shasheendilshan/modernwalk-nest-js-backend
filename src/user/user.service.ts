import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { TenantService } from './../tenant/tenant.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tenantService: TenantService,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getAllUsersForTenant(tenantId: number): Promise<User[]> {
    if (!tenantId)
      throw new BadRequestException('tenantId required as query parameter');
    return await this.userRepository.find({
      where: { tenantId: tenantId },
    });
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
  async addUser(createUserDto: CreateUserDto) {
    //check tenant id exist
    await this.tenantService.getTenantById(createUserDto.tenantId);

    const emailCheck = await this.userRepository.findOne({
      where: { email: createUserDto.email, tenantId: createUserDto.tenantId },
    });
    if (emailCheck) throw new ConflictException('Email already registered');
    const hashPassword = await bcrypt.hash(createUserDto.password, 12);
    return this.userRepository.save({
      ...createUserDto,
      password: hashPassword,
    });
  }
}
