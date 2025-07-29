import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoles } from '../user-roles';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  profilePic: string;

  @IsString()
  @IsOptional()
  role: UserRoles;

}