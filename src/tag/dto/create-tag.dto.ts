import { ApiProperty } from "@nestjs/swagger";

export class CreateTagDto {
  @ApiProperty()
  nome: string;
}