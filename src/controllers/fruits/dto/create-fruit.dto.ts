import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { Category } from "src/controllers/categories/entities/category.entity";


export class CreateFruitDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    mainImage: string;

    @IsOptional()
    category: Category;

    @IsOptional()
    @IsNotEmpty()
    images: string[]
}
