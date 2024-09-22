import { forwardRef, Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { DatabaseModule } from 'src/database/database.module';
import { empresasProviders } from './empresas.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [EmpresasController],
  providers: [
    ...empresasProviders,
    EmpresasService
  ],
  exports: [...empresasProviders]
})
export class EmpresasModule {}
