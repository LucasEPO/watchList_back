import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { CreateRelatorioDto } from './dto/create-relatorio.dto';
import { UpdateRelatorioDto } from './dto/update-relatorio.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Relatorios') 
@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo relatorio' })
  @ApiResponse({ status: 201, description: 'Relatorio criado com sucesso.' })
  @ApiBody({ description: 'Os dados do novo relatorio', type: CreateRelatorioDto })
  create(@Body() createRelatorioDto: CreateRelatorioDto) {
    return this.relatoriosService.create(createRelatorioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os relatorios' })
  findAll() {
    return this.relatoriosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca por um funcionario pelo id' })
  @ApiParam({ name: 'id', description: 'Id do relatorio', required: true, example: 1 })
  findOne(@Param('id') id: string) {
    return this.relatoriosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar os dados de um relatorio' })
  @ApiParam({ name: 'id', description: 'O id do relatorio a ser atualizado' })
  @ApiBody({ type: UpdateRelatorioDto, description: 'Dados a serem atualizados do relatorio' })
  update(@Param('id') id: string, @Body() updateRelatorioDto: UpdateRelatorioDto) {
    return this.relatoriosService.update(+id, updateRelatorioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um funcionario pelo id' })
  @ApiParam({ name: 'id', description: 'O id do relatorio a ser excluido' })
  remove(@Param('id') id: string) {
    return this.relatoriosService.remove(+id);
  }
}
