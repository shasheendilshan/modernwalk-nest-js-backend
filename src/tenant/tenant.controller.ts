import {
  Controller,
  Get,
  Delete,
  Patch,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { TenantService } from './tenant.service';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { CreateTenantDto } from './dto/create-tenant.dto';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tenants' })
  getAllTenants() {
    return this.tenantService.getAllTenants();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get tenant using Id' })
  getTenantById(@Param('id') id: number) {
    return this.tenantService.getTenantById(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete tenant using Id' })
  deleteTenant(@Param('id') id: number) {
    return this.tenantService.deleteTenant(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update tenant using Id' })
  updateTenantById(
    @Body() updateTenantDto: UpdateTenantDto,
    @Param('id') id: number,
  ) {
    return this.tenantService.updateTenantById(id, updateTenantDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create tenant' })
  addTenant(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.addTenant(createTenantDto);
  }
}
