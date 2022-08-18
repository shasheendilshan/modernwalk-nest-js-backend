import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  title: string;

  @IsNumber()
  tenantId: number;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsString()
  image: string;
}
