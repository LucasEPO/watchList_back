import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @ApiProperty({
    description: 'Nome da empresa (opcional)',
    example: 'Empresa Exemplo',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Login da empresa',
    example: 'empresa',
    required: true, 
  })
  @IsString()
  login: string; 

  @ApiProperty({
    description: 'Senha da empresa o campo sera criptografado',
    example: 'Qualquer_senha',
    required: true, 
  })
  @IsString()
  pass_hash: string; 
}