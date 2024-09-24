import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateRelatorioDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsBoolean()
    @IsOptional()
    is_finished: boolean;
  
    @IsBoolean()
    @IsOptional()
    is_priority: boolean;
    
    @IsString()
    @IsOptional()
    complete_form: string;
    
    @IsDate()
    @IsOptional()
    create_date: Date;
    
    @IsDate()
    @IsOptional()
    finished_date: Date;
    
    @IsDate()
    @IsOptional()
    last_update: Date;
    
    @IsInt()
    @IsOptional()
    funcionario_id: number;
    
    @IsInt()
    @IsOptional()
    empresa_id: number;
}