import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateRelatorioDto {
  @ApiProperty({
    description: 'Titulo do relatorio',
    example: 'Relatorio de Seguranca',
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
  is_finished?: boolean;

  @ApiProperty({
    description: 'Indica se o relatorio deve ter prioridade',
    example: false,
    default: false,
  })
  @IsBoolean()
  is_priority?: boolean;

  @ApiProperty({
    description: 'Formulario completo do relatorio recebe objeto JSON e salva Text',
    example: JSON.stringify({
        field1: 'Value1',
        field2: 'Value2',
        field3: 'Value3',
      }),
  })
  @IsString()
  complete_form?: string;

  @ApiProperty({
    description: 'Data de cracao do relatorio (opcional)',
    example: '2024-09-24T10:00:00Z',
    default: () => new Date().toISOString(),
    required: false
  })
  @IsDate()
  @IsOptional()
  create_date?: Date;

  @ApiProperty({
    description: 'Data de finalizacao do relatorio (opcional)',
    example: '2024-09-25T10:00:00Z',
    required: false,
    default: null,
  })
  @IsDate()
  @IsOptional()
  finished_date?: Date;

  @ApiProperty({
    description: 'Data da ultima atualizacao do relatorio (opcional)',
    example: '2024-09-24T10:00:00Z',
    required: false,
    default: null,
  })
  @IsDate()
  @IsOptional()
  last_update?: Date;

  @ApiProperty({
    description: 'ID do funcionario que criou o relatorio',
    example: 1,
    required: false,
  })
  @IsInt()
  funcionario_id?: number;

  @ApiProperty({
    description: 'ID da empresa associada ao relatorio',
    example: 1,
  })
  @IsInt()
  empresa_id?: number;
}