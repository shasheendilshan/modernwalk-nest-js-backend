import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entity/tenant.entity';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  getAllTenants(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async getTenantById(id: number) {
    let tenant = await this.tenantRepository.findOne({ where: { id: id } });
    if (!tenant) {
      throw new NotFoundException(`tenant id ${id} does not exist`);
    }
    return tenant;
  }

  async deleteTenant(id: number) {
    await this.getTenantById(id);
    return this.tenantRepository.delete(id);
  }

  async updateTenantById(id: number, updateTenantDto: UpdateTenantDto) {
    await this.getTenantById(id);
    return this.tenantRepository.update(id, updateTenantDto);
  }
  addTenant(createTenantDto: CreateTenantDto) {
    return this.tenantRepository.save(createTenantDto);
  }
}
