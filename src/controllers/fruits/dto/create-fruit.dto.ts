import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { Category } from "src/controllers/categories/entities/category.entity";


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
