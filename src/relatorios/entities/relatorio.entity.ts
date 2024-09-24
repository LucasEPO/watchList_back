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
    complete_form: string;
    
    @Column('datetime') 
    create_date: Date;

    @Column({type: 'datetime', nullable: true}) 
    finished_date: Date;
    
    @Column('datetime') 
    last_update: Date;
    
    @ManyToOne(() => Funcionarios, (funcionario) => funcionario.relatorios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'funcionario_id' })
    funcionario: Funcionarios;
    
    @ManyToOne(() => Empresas, (empresa) => empresa.relatorios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'empresa_id' })
    empresa: Empresas;
}
