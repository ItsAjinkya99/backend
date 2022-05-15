import { IsNotEmpty, IsString } from "class-validator";
import { UserRoles } from "../user-roles";

export class UserLoginDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    role: UserRoles;
}