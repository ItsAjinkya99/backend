import { PartialType } from '@nestjs/mapped-types';
import { CreateMainDto } from './vendor.dto';

export class UpdateMainDto extends PartialType(CreateMainDto) {}
