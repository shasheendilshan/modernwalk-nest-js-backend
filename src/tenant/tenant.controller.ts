import {
  Controller,
  Get,
  Delete,
  Patch,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TenantService } from './tenant.service';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { CreateTenantDto } from './dto/create-tenant.dto';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get()
  getAllTenants() {
    return this.tenantService.getAllTenants();
  }

  @Get('/:id')
  getTenantById(@Param('id') id: number) {
    return this.tenantService.getTenantById(id);
  }

  @Delete('/:id')
  deleteTenant(@Param('id') id: number) {
    return this.tenantService.deleteTenant(id);
  }

  @Patch('/:id')
  updateTenantById(
    @Body() updateTenantDto: UpdateTenantDto,
    @Param('id') id: number,
  ) {
    return this.tenantService.updateTenantById(id, updateTenantDto);
  }

  @Post()
  addTenant(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.addTenant(createTenantDto);
  }
}
