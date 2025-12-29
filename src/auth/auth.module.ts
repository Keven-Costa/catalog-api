import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controller/auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        forwardRef( () => UsuarioModule ),
        PassportModule,
        JwtModule.registerAsync( {
            inject: [ ConfigService ],
            useFactory: ( config: ConfigService ) => ( {
                secret: config.get< string >( 'JWT_SECRET' ),
                signOptions: { expiresIn: '1h' },
            } ),
        } ),
    ],
    controllers: [ AuthController ],
    providers: [ Bcrypt, AuthService, LocalStrategy, JwtStrategy ],
    exports: [ Bcrypt ],
})
export class AuthModule { };