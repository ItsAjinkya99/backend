import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { Category } from "src/controllers/main/entities/categories.model";
import { Mineral } from "src/controllers/main/entities/minerals.model";
import { Vitamin } from "src/controllers/main/entities/vitamins.model";


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
    image: string;

    @IsOptional()
    category: Category;
}
