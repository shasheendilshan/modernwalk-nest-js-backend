import { Injectable } from '@nestjs/common';
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

  getTenantById(id: number) {
    return this.tenantRepository.findOne({ where: { id: id } });
  }

  deleteTenant(id: number) {
    return this.tenantRepository.delete(id);
  }

  updateTenantById(id: number, updateTenantDto: UpdateTenantDto) {
    return this.tenantRepository.update(id, updateTenantDto);
  }
  addTenant(createTenantDto: CreateTenantDto) {
    return this.tenantRepository.save(createTenantDto);
  }
}
