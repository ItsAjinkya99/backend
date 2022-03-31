import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { Category } from "src/controllers/categories/entities/category.entity";

export class CreateVegetableDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    vitaminsId: string;

    @IsNotEmpty()
    mineralsId: string;

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
