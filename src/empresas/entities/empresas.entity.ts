import { Funcionarios } from 'src/funcionarios/entities/funcionarios.entity';
import { Relatorios } from 'src/relatorios/entities/relatorio.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Empresas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length : 50 })
  name: string;

  @Column({ length : 50, unique: true})
  login: string;

  @Column({ length : 255 })
  pass_hash: string;

  @OneToMany(() => Funcionarios, (funcionario) => funcionario.empresa)
    funcionarios: Funcionarios[];
  
  @OneToMany(() => Relatorios, (relatorios) => relatorios.empresa)
    relatorios: Relatorios[];
}
