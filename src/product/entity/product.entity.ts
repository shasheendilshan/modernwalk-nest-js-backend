import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tenant } from './../../tenant/entity/tenant.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  image: string;

  @Column()
  tenantId: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.products, { onDelete: 'CASCADE' })
  tenant: Tenant;
}
