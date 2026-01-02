import { PartialType } from '@nestjs/swagger';
import { CreateLocalizacaoDto } from './create-localizacao.dto';

export class UpdateLocalizacaoDto extends PartialType( CreateLocalizacaoDto ) { }
