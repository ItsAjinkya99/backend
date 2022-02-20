import { PartialType } from '@nestjs/swagger';
import { CreateMineralDto } from './create-mineral.dto';

export class UpdateMineralDto extends PartialType(CreateMineralDto) {}
