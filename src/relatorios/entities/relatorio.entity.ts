import { Empresas } from "src/empresas/entities/empresas.entity";
import { Funcionarios } from "src/funcionarios/entities/funcionarios.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Relatorios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 }) 
    title: string;

    @Column() 
    isFinished: boolean;

    @Column() 
    isPriority: boolean;

    @Column('text') 
    completeForm: string;
    
    @Column('datetime') 
    createDate: Date;

    @Column('datetime') 
    finishedDate: Date;
    
    @Column('datetime') 
    lastUpdate: Date;
    
    @ManyToOne(() => Funcionarios, (funcionario) => funcionario.relatorios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'funcionario_id' })
    funcionario: Funcionarios;
    
    @ManyToOne(() => Empresas, (empresa) => empresa.relatorios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'empresa_id' })
    empresa: Empresas;
}
