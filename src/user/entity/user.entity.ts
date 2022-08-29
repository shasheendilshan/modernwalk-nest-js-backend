import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tenant } from '../../tenant/entity/tenant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  tenant: Tenant;
}
