
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export class CreateCustomerDto extends CreateUserDto {

  @IsString()
  @IsNotEmpty()
  billingAddress: string;

  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

}