
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateVitaminDto {
    @IsString()
    @IsNotEmpty()
    name: string;

}