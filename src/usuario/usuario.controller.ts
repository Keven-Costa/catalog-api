import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./entities/usuario.entity";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

@Controller( '/usuarios' )
export class UsuarioController {
    constructor( private readonly usuarioService: UsuarioService ) { }

    @Post( '/cadastrar' )
    @HttpCode( HttpStatus.CREATED )
    async create( @Body() usuario: Usuario ): Promise< Usuario > {
        return this.usuarioService.create( usuario )
    }

    @UseGuards( JwtAuthGuard )
    @Get()
    @HttpCode( HttpStatus.OK )
    async findAll(): Promise< Usuario[] > {
        return this.usuarioService.findAll();
    }

    @UseGuards( JwtAuthGuard )
    @Get( '/:id' )
    @HttpCode( HttpStatus.OK )
    async findById( @Param( 'id', ParseIntPipe ) id: number ): Promise< Usuario > {
        return this.usuarioService.findById( id )
    }

    @UseGuards( JwtAuthGuard )
    @Put( '/atualizar' )
    @HttpCode( HttpStatus.OK )
    async update( @Body() usuario: Usuario ): Promise< Usuario > {
        return this.usuarioService.update( usuario )
    }

    @UseGuards( JwtAuthGuard )
    @Delete( '/:id' )
    @HttpCode( HttpStatus.NO_CONTENT )
    async remove( @Param( 'id', ParseIntPipe ) id: number ): Promise< void > {
        return this.usuarioService.remove( id )
    }

}