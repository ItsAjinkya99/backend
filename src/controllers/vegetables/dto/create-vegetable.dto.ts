import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { Category } from "src/controllers/categories/entities/category.entity";

export class CreateVegetableDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    images: string[]
    
    @IsString()
    @IsOptional()
    mainImage: string;

    @IsOptional()
    vitaminsId: string;

    @IsOptional()
    mineralsId: string;

    @IsOptional()
    categoriesId: string;

    /* @IsOptional()
    category: Category; */

}
