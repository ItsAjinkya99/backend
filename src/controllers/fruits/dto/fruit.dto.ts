import { IsNotEmpty, IsNumber, IsOptional, IsString, isNumber } from "class-validator";

export class FruitDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    images: string[]

    @IsString()
    @IsOptional()
    mainImage: string;

    @IsNumber()
    quantity = 0

    @IsNumber()
    quantityInKg = 0

    @IsNumber()
    shopId = 0

    @IsNumber()
    vendorId = 0
}
