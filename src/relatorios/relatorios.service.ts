import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRelatorioDto } from './dto/create-relatorio.dto';
import { UpdateRelatorioDto } from './dto/update-relatorio.dto';
import { Repository } from 'typeorm';
import { Relatorios } from './entities/relatorio.entity';
import { EmpresasService } from 'src/empresas/empresas.service';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';

@Injectable()
export class RelatoriosService {
  constructor(
    @Inject('RELATORIOS_REPOSITORY')
    private relatoriosRepository: Repository<Relatorios>,
    private readonly empresasService: EmpresasService,
    private readonly funcionariosService: FuncionariosService
  ) {}

  async create(createRelatorioDto: CreateRelatorioDto) {
    const empresa = await this.empresasService.findOne(createRelatorioDto.empresa_id);
    if (!empresa) 
      throw new NotFoundException(`Empresa com ID ${createRelatorioDto.empresa_id} não encontrada!`);
    

    const funcionario = await this.funcionariosService.findOne(createRelatorioDto.funcionario_id);
    if (!funcionario) 
      throw new NotFoundException(`Funcionario com ID ${createRelatorioDto.funcionario_id} não encontrada!`);

    const relatorio = await this.relatoriosRepository.create({
      ...createRelatorioDto,
      completeForm: JSON.stringify(createRelatorioDto.completeForm),
    });
    relatorio.empresa = empresa;
    relatorio.funcionario = funcionario;
    
    const relatorioSaved = await this.relatoriosRepository.save(relatorio);
    return relatorioSaved;
  }

  findAll(): Promise<Relatorios[]> {
    return this.relatoriosRepository.find({
      relations: ['empresa', 'funcionario'] 
    });
  }

  findOne(id: number): Promise<Relatorios> {
    return this.relatoriosRepository.findOne({
      where: { id },
      relations: ['empresa', 'funcionarios'] 
    });
  }

  async update(id: number, updateRelatorioDto: UpdateRelatorioDto): Promise<any> {
    const relatorio = await this.findOne(id);
    if (!relatorio) 
      throw new NotFoundException(`Relatorio com ID ${id} não encontrado!`);
    

    const empresaId = updateRelatorioDto.empresa_id;
    if (empresaId !== relatorio.empresa.id) {
      const empresa = await this.empresasService.findOne(empresaId);
      if (!empresa) 
        throw new NotFoundException(`Empresa com ID ${empresaId} não encontrado!`);
      
      relatorio.empresa = empresa; 
    }

    const funcionarioId = updateRelatorioDto.funcionario_id;
    if (funcionarioId !== relatorio.funcionario.id) {
      const funcionario = await this.funcionariosService.findOne(funcionarioId);
      if (!funcionario) 
        throw new NotFoundException(`Funcionario com ID ${funcionarioId} não encontrado!`);
      
      relatorio.funcionario = funcionario; 
    }

    Object.assign(relatorio, updateRelatorioDto);
    relatorio.completeForm = JSON.stringify(updateRelatorioDto.completeForm);

    const relatorioUpdated = await this.relatoriosRepository.save(relatorio);
    return relatorioUpdated;
  }

  remove(id: number) {
    return this.relatoriosRepository.delete(id).then(() => undefined);
  }
}
