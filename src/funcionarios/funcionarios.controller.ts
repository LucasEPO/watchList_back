import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Funcionarios') 
@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo funcioanario' })
  @ApiBody({ description: 'Os dados do novo funcionario', type: CreateFuncionarioDto })
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionariosService.create(createFuncionarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os funcionarios' })
  findAll() {
    return this.funcionariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca por um funcionario pelo id' })
  @ApiParam({ name: 'id', description: 'Id do funcionario', required: true, example: 1 })
  findOne(@Param('id') id: string) {
    return this.funcionariosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar os dados de um funcionario' })
  @ApiParam({ name: 'id', description: 'O id do funcionario a ser atualizado' })
  @ApiBody({ type: UpdateFuncionarioDto, description: 'Dados a serem atualizados do funcionario' })
  update(@Param('id') id: string, @Body() updateFuncionarioDto: UpdateFuncionarioDto) {
    return this.funcionariosService.update(+id, updateFuncionarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um funcionario pelo id' })
  @ApiParam({ name: 'id', description: 'O id do funcionario a ser excluido' })
  remove(@Param('id') id: string) {
    return this.funcionariosService.remove(+id);
  }
}
