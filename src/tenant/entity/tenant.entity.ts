import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Product } from './../../product/entity/product.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  themeId: number;

  @OneToMany((type) => User, (user) => user.tenant)
  users: User[];

  @OneToMany((type) => Product, (product) => product.tenant)
  products: Product[];
}
