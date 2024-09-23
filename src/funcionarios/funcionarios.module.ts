import { forwardRef, Module } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { FuncionariosController } from './funcionarios.controller';
import { EmpresasService } from 'src/empresas/empresas.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { FuncionariosProviders } from './funcionarios.providers';
import { EmpresasModule } from 'src/empresas/empresas.module';

@Module({
  imports: [
    forwardRef(() => AuthModule), 
    DatabaseModule,
    EmpresasModule,
  ],
  controllers: [FuncionariosController],
  providers: [
    ...FuncionariosProviders,
    FuncionariosService,
    EmpresasService
  ],
  exports: [...FuncionariosProviders],
})
export class FuncionariosModule {}
