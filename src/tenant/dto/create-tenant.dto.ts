import { IsNumber, IsString } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  name: string;

  @IsNumber()
  themeId: number;
}
