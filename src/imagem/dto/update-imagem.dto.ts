import { PartialType } from '@nestjs/swagger';
import { CreateImagenDto } from './create-imagem.dto';

export class UpdateImagenDto extends PartialType( CreateImagenDto ) { }
