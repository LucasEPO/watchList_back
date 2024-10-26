import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Empresas') 
@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova empresa' })
  @ApiBody({ description: 'Os dados da nova empresa', type: CreateEmpresaDto })
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresasService.create(createEmpresaDto);
  }

  //@UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Busca todas as empresas' })
  findAll() {
    return this.empresasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca por uma empresa pelo id' })
  @ApiParam({ name: 'id', description: 'Id da empresa', required: true, example: 1 })
  findOne(@Param('id') id: string) {
    return this.empresasService.findOne(+id);
  }
  
  
  @Get('login/:login')
  @ApiOperation({ summary: 'Busca por uma empresa pelo login' })
  @ApiParam({ name: 'login', description: 'Login da empresa', required: true, example: 'Exemplo' })
  findOneByLogin(@Param('login') login: string) {
    return this.empresasService.findOneByLogin(login);
  }
  
  @Get('relatorios/:id')
  @ApiOperation({ summary: 'Reotrna todos relatorios de uma empresa' })
  @ApiParam({ name: 'id', description: 'Id da empresa', required: true, example: 1 })
  findAllReports(@Param('id') id: string) {
    return this.empresasService.findAllReports(+id);
  }
  
  @Get('funcionarios/:id')
  @ApiOperation({ summary: 'Reotrna todos funcionarios de uma empresa' })
  @ApiParam({ name: 'id', description: 'Id da empresa', required: true, example: 1 })
  findAllEmployees(@Param('id') id: string) {
    return this.empresasService.findAllEmployees(+id);
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar os dados de uma empresa' })
  @ApiParam({ name: 'id', description: 'O id da empresa a ser atualizada' })
  @ApiBody({ type: UpdateEmpresaDto, description: 'Dados a serem atualizados da empresa' })
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.update(+id, updateEmpresaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma empresa pelo id' })
  @ApiParam({ name: 'id', description: 'O id da empresa a ser excluida' })
  remove(@Param('id') id: string) {
    return this.empresasService.remove(+id);
  }
}
