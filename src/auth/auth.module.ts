import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmpresasModule } from 'src/empresas/empresas.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { EmpresasService } from 'src/empresas/empresas.service';
import { AuthGuard } from './auth.guard';
import { FuncionariosModule } from 'src/funcionarios/funcionarios.module';

@Module({
  imports: [
    EmpresasModule,
    FuncionariosModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService, 
    EmpresasService, 
    AuthGuard
  ],
  controllers: [AuthController],
  exports:[JwtModule, AuthService]
})
export class AuthModule {}
