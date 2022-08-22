import { IsNumber, IsString } from 'class-validator';

export class UpdateTenantDto {
  @IsString()
  name: string;

  @IsNumber()
  themeId: number;
}
