import { IsOptional } from "class-validator";
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
    @IsOptional()
    is_finished: boolean;
    
    @Column() 
    @IsOptional()
    is_priority: boolean;

    @Column('text') 
    description: string;
    
    @Column('text', {nullable: true} ) 
    prevention_action: string;
    
    @Column('text', {nullable: true}) 
    risk_action: string;
    
    @Column({ length : 1 }) 
    workshift: string;
    
    @Column({ length : 60, nullable: true }) 
    department: string;
    
    @Column({ length : 60, nullable: true }) 
    equipament: string;
    
    @Column('datetime') 
    create_date: Date;
    
    @Column('datetime') 
    date: Date;

    @Column({type: 'datetime', nullable: true}) 
    finished_date: Date;
    
    @Column({type: 'datetime', nullable: true}) 
    last_update: Date;
    
    @ManyToOne(() => Funcionarios, (funcionario) => funcionario.relatorios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'funcionario_id' })
    funcionario: Funcionarios;
    
    @ManyToOne(() => Empresas, (empresa) => empresa.relatorios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'empresa_id' })
    empresa: Empresas;
}
