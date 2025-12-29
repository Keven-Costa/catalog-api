import { PartialType } from '@nestjs/mapped-types';
import { CreateLocalizacaoDto } from './create-localizacao.dto';

export class UpdateLocalizacaoDto extends PartialType( CreateLocalizacaoDto ) {}
