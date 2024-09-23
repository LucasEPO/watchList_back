import { DataSource } from 'typeorm';
import { Relatorios } from './entities/relatorio.entity';

export const RelatoriosProviders = [
  {
    provide: 'RELATORIOS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Relatorios),
    inject: ['DATA_SOURCE'],
  },
];