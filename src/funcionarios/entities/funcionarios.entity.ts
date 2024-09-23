import { Empresas } from 'src/empresas/entities/empresas.entity';
import { Relatorios } from 'src/relatorios/entities/relatorio.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Funcionarios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true })
    email: string;

    @ManyToOne(() => Empresas, (empresa) => empresa.funcionarios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'empresa_id' })
    empresa: Empresas;

    @OneToMany(() => Relatorios, (relatorio) => relatorio.funcionario)
    relatorios: Relatorios[];
}
