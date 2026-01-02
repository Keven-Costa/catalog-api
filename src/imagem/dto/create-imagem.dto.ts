import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsUrl, IsString } from "class-validator";

export class CreateImagenDto {
  @ApiProperty({
    description: 'URL completa da imagem armazenada (ex: S3, Cloudinary ou servidor local)',
    example: 'https://meu-bucket.s3.amazonaws.com/item-01.jpg',
  })
  @IsString({ message: 'A URL deve ser uma sequência de caracteres' })
  @IsNotEmpty({ message: 'A URL da imagem é obrigatória' })
  @IsUrl({}, { message: 'O formato da URL é inválido' }) // Valida se é um link real
  url_imagem: string;

  @ApiProperty({
    description: 'Define se esta é a imagem principal que aparecerá na capa do catálogo',
    default: false,
    required: false 
  })
  @IsOptional()
  @IsBoolean({ message: 'O campo eh_principal deve ser um booleano' })
  eh_principal: boolean;
  
  @ApiProperty({
    description: 'ID do item ao qual esta imagem pertence',
    example: 1,
  })
  @IsNumber({}, { message: 'O item_id deve ser um número' })
  @IsNotEmpty({ message: 'O ID do item vinculado é obrigatório' })
  item_id: number; 
}