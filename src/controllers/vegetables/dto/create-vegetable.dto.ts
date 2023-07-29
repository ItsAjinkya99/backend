import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateVegetableDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    images: string[]

    @IsString()
    @IsOptional()
    mainImage: string;

}
