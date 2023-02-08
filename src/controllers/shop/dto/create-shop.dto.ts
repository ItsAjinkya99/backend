import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateShopDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    contact: string;

    @IsString()
    @IsOptional()
    userId: string;

    @IsString()
    @IsOptional()
    vendorId: string;
}
