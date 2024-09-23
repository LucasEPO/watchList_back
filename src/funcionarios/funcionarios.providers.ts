import { DataSource } from 'typeorm';
import { Funcionarios } from './entities/funcionarios.entity';

export const FuncionariosProviders = [
  {
    provide: 'FUNCIONARIOS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Funcionarios),
    inject: ['DATA_SOURCE'],
  },
];