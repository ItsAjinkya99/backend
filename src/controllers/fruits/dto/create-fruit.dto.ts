import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { Category } from "src/controllers/categories/entities/category.entity";


export class CreateFruitDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    vitaminsId: string;

    @IsNotEmpty()
    mineralsId: string;

    /* @IsNotEmpty()
    vitaminI: Vitamin;

    @IsNotEmpty()
    mineral: Mineral; */

    @IsOptional()
    categoriesId: string;

    @IsString()
    @IsNotEmpty()
    mainImage: string;

    @IsOptional()
    category: Category;

    @IsOptional()
    @IsNotEmpty()
    images: string[]
}
