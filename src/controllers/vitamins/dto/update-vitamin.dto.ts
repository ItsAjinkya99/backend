import { PartialType } from '@nestjs/swagger';
import { CreateVitaminDto } from './create-vitamin.dto';

export class UpdateVitaminDto extends PartialType(CreateVitaminDto) {}
