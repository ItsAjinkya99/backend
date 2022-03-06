
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateMineralDto {
    @IsString()
    @IsNotEmpty()
    name: string;

}