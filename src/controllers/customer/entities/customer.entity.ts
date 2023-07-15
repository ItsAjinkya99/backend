import { Column, Entity } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Entity('customers')
export class Customer extends User {

  @Column({ nullable: false })
  billingAddress: string;

  @Column({ nullable: false })
  shippingAddress: string;

}