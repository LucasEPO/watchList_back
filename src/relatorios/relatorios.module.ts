import { forwardRef, Module } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { RelatoriosController } from './relatorios.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { EmpresasModule } from 'src/empresas/empresas.module';
import { FuncionariosModule } from 'src/funcionarios/funcionarios.module';
import { RelatoriosProviders } from './relatorios.providers';
import { EmpresasService } from 'src/empresas/empresas.service';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => EmpresasModule),
    DatabaseModule,
    FuncionariosModule,
  ],
  controllers: [RelatoriosController],
  providers: [
    ...RelatoriosProviders,
    RelatoriosService,
    EmpresasService,
    FuncionariosService,
  ],
})
export class RelatoriosModule {}
