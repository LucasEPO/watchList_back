import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateRelatorioDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsBoolean()
    @IsOptional()
    isFinished: boolean;
  
    @IsBoolean()
    @IsOptional()
    isPriority: boolean;
    
    @IsString()
    @IsOptional()
    completeForm: string;
    
    @IsDate()
    @IsOptional()
    createDate: Date;
    
    @IsDate()
    @IsOptional()
    finishedDate: Date;
    
    @IsDate()
    @IsOptional()
    lastUpdate: Date;
    
    @IsInt()
    @IsOptional()
    funcionario_id: number;
    
    @IsInt()
    @IsOptional()
    empresa_id: number;
}