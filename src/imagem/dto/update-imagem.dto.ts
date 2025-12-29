import { PartialType } from '@nestjs/mapped-types';
import { CreateImagenDto } from './create-imagem.dto';

export class UpdateImagenDto extends PartialType( CreateImagenDto ) {}
