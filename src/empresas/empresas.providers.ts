import { DataSource } from 'typeorm';
import { Empresas } from './entities/empresas.entity';

export const EmpresasProviders = [
  {
    provide: 'EMPRESAS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Empresas),
    inject: ['DATA_SOURCE'],
  },
];