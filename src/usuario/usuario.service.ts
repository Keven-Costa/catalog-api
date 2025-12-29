import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Bcrypt } from '../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository( Usuario )
        private usuarioRepository: Repository< Usuario >,
        private bcrypt: Bcrypt  
    ) { }

    async findByUsuario( usuario: string ): Promise< Usuario | null > {
        return this.usuarioRepository.findOne( {
            where: {
                usuario: usuario
            }
        } )
    }

    async findAll(): Promise< Usuario[] > {
        return this.usuarioRepository.find();
    }

    async findById( id: number ): Promise< Usuario > {
        let usuario = await this.usuarioRepository.findOne( {
            where: { id }
        } );

        if ( !usuario )
            throw new HttpException( 'Usuário não encontrado!', HttpStatus.NOT_FOUND );

        return usuario;
    }

    async create( usuario: Usuario ): Promise< Usuario > {
        let usuarioBusca = await this.findByUsuario( usuario.usuario );

        if ( !usuarioBusca ) {
            usuario.senha = await this.bcrypt.criptografarSenha( usuario.senha )

            return this.usuarioRepository.save( usuario );
        }

        throw new HttpException( "O Usuário ja existe!", HttpStatus.BAD_REQUEST );

    }

    async update( usuario: Usuario ): Promise< Usuario > {
        let usuarioUpdate: Usuario = await this.findById( usuario.id )
        let usuarioBusca = await this.findByUsuario( usuario.usuario ) 

        if ( !usuarioUpdate )
            throw new HttpException( 'Usuário não encontrado!', HttpStatus.NOT_FOUND );

        if ( usuarioBusca && usuarioBusca.id !== usuario.id )
            throw new HttpException( 'Usuário (e-mail) já Cadastrado, digite outro!', HttpStatus.BAD_REQUEST );

        usuario.senha = await this.bcrypt.criptografarSenha( usuario.senha )
        return this.usuarioRepository.save( usuario );
    }

    async remove( id: number ): Promise< void > {
        const usuario = await this.findById( id );
        await this.usuarioRepository.remove( usuario );
    }
}