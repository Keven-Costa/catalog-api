import { PartialType } from '@nestjs/mapped-types';
import { CreateLogDto } from './create-logs_.dto';

export class UpdateLogDto extends PartialType( CreateLogDto ) { }
