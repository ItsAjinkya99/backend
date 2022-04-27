import { IsNotEmpty, IsString } from "class-validator";

export class CustomerLoginDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}