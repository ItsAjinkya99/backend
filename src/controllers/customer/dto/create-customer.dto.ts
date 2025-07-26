
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from '../../../auth/dto/create-user.dto';

export class CreateCustomerDto extends CreateUserDto {

  @IsString()
  @IsOptional()
  billingAddress: string;

  @IsString()
  @IsOptional()
  shippingAddress: string;

}