import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFruitDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    images: string[]

    @IsString()
    @IsOptional()
    mainImage: string;
}
