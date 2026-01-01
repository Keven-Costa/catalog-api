import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./entities/usuario.entity";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags( 'Usuários' )
@Controller( '/usuarios' )
export class UsuarioController {
    constructor( private readonly usuarioService: UsuarioService ) { }

    @ApiOperation({ summary: 'Cadastar um usuário' })
    @Post( '/cadastrar' )
    @HttpCode( HttpStatus.CREATED )
    async create( @Body() usuario: Usuario ): Promise< Usuario > {
        return this.usuarioService.create( usuario )
    }

    @ApiOperation({ summary: 'Consultar todos os usuários' })
    @UseGuards( JwtAuthGuard )
    @Get()
    @HttpCode( HttpStatus.OK )
    async findAll(): Promise< Usuario[] > {
        return this.usuarioService.findAll();
    }

    @ApiOperation({ summary: 'Consultar um usuário pelo ID' })
    @UseGuards( JwtAuthGuard )
    @Get( '/:id' )
    @HttpCode( HttpStatus.OK )
    async findById( @Param( 'id', ParseIntPipe ) id: number ): Promise< Usuario > {
        return this.usuarioService.findById( id )
    }

    @ApiOperation({ summary: 'Atualizar um usuário' })
    @UseGuards( JwtAuthGuard )
    @Put( '/atualizar' )
    @HttpCode( HttpStatus.OK )
    async update( @Body() usuario: Usuario ): Promise< Usuario > {
        return this.usuarioService.update( usuario )
    }

    @ApiOperation({ summary: 'Deletar um usuário' })
    @UseGuards( JwtAuthGuard )
    @Delete( '/:id' )
    @HttpCode( HttpStatus.NO_CONTENT )
    async remove( @Param( 'id', ParseIntPipe ) id: number ): Promise< void > {
        return this.usuarioService.remove( id )
    }

}