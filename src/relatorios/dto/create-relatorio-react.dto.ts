import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateRelatorioReactDto {
  @ApiProperty({
    description: 'Titulo do relatorio',
    example: 'Relatorio de Seguranca',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Indica se o relatorio esta finalizado',
    example: true,
    default: false,
    required: false,
  })
  @IsBoolean()
  isFinished?: boolean;

  @ApiProperty({
    description: 'Indica se o relatorio deve ter prioridade',
    example: false,
    default: false,
  })
  @IsBoolean()
  isPriority?: boolean;

  @ApiProperty({
    description: 'Descrição do que viu como risco',
    example: 'Piso quebrado perto de maquina, risco de queda com euqipamentos perigosos',
    required: true
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Descricao de alguma ação que foi tomada para evitar mais riscos na hora',
    example: 'Foi colocado uma sinalização próxima do local',
    required: false
  })
  @IsOptional()
  @IsString()
  preventionAction?: string;

  @ApiProperty({
    description: 'Descricao de alguma ação que possa ser tomada para solucionar o problema',
    example: 'Interdição e concerto do piso',
    required: false
  })
  @IsOptional()
  @IsString()
  riskAction?: string;
  
  @ApiProperty({
    description: 'Local onde há o risco relatado',
    example: 'Sala de máquinas principal',
    required: false
  })
  @IsOptional()
  @IsString()
  department?: string;
  
  @ApiProperty({
    description: 'Equipamento que esteja causando o risco',
    example: 'Máquina 1',
    required: false
  })
  @IsOptional()
  @IsString()
  equipment?: string;
  
  @ApiProperty({
    description: 'Turno de trabalho o qual foi observado o risco',
    example: '1',
    required: true
  })
  @IsString()
  workshift: string;

  @ApiProperty({
    description: 'Data de quando o risco foi observado',
    example: '2024-09-24T10:00:00Z',
    default: () => new Date().toISOString(),
    required: true
  })
  @IsDate()
  @IsOptional()
  date: Date;

  @ApiProperty({
    description: 'Data de finalizacao do relatorio (opcional)',
    example: '2024-09-25T10:00:00Z',
    required: false,
    default: null,
  })
  @IsDate()
  @IsOptional()
  finishDate?: Date;

  @ApiProperty({
    description: 'ID do funcionario que criou o relatorio',
    example: 1,
    required: true,
  })
  @IsInt()
  employeeId?: number;

  @ApiProperty({
    description: 'ID da empresa associada ao relatorio',
    example: 1,
    required: true,
  })
  @IsInt()
  companyId?: number;
}