import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRelatorioDto } from './dto/update-relatorio.dto';
import { Repository } from 'typeorm';
import { Relatorios } from './entities/relatorio.entity';
import { EmpresasService } from 'src/empresas/empresas.service';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';
import { CreateRelatorioReactDto } from './dto/create-relatorio-react.dto';
import { UpdateRelatorioReactDto } from './dto/update-relatorio-react.dto';

@Injectable()
export class RelatoriosService {
  constructor(
    @Inject('RELATORIOS_REPOSITORY')
    private relatoriosRepository: Repository<Relatorios>,
    private readonly empresasService: EmpresasService,
    private readonly funcionariosService: FuncionariosService
  ) {}

  async create(createRelatorioDto: CreateRelatorioReactDto) {
    const empresa = await this.empresasService.findOne(createRelatorioDto.enterpriseId);
    if (!empresa) 
      throw new NotFoundException(`Empresa com ID ${createRelatorioDto.enterpriseId} não encontrada!`);

    const funcionario = await this.funcionariosService.findOne(createRelatorioDto.employeeId); 
    if (!funcionario) 
      throw new NotFoundException(`Funcionario com ID ${createRelatorioDto.employeeId} não encontrada!`);

    const relatorio = this.relatoriosRepository.create({
      title: createRelatorioDto.title,
      department: createRelatorioDto.department,
      equipament: createRelatorioDto.equipment,
      description: createRelatorioDto.description,
      workshift: createRelatorioDto.workshift,
      prevention_action: createRelatorioDto.preventionAction || null,
      risk_action: createRelatorioDto.riskAction || null,
      is_finished: createRelatorioDto.isFinished || false, 
      is_priority: createRelatorioDto.isPriority || true, 
      date: createRelatorioDto.date || new Date(),
      finished_date: createRelatorioDto.finishDate || null, 
      create_date: new Date(),
      last_update: null,
      empresa: empresa,
      funcionario: funcionario,
    });

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
      relations: ['empresa', 'funcionario'] 
    });
  }

  async update(id: number, updateRelatorioDto: UpdateRelatorioReactDto): Promise<any> {
    const relatorio = await this.findOne(id);
    if (!relatorio) 
      throw new NotFoundException(`Relatorio com ID ${id} não encontrado!`);
    

    if (updateRelatorioDto.enterpriseId){
      const empresaId = updateRelatorioDto.enterpriseId;
      if (empresaId !== relatorio.empresa.id) {
        const empresa = await this.empresasService.findOne(empresaId);
        if (!empresa) 
          throw new NotFoundException(`Empresa com ID ${empresaId} não encontrado!`);
        
        relatorio.empresa = empresa; 
      }
    }

    if (updateRelatorioDto.employeeId){
      const funcionarioId = updateRelatorioDto.employeeId;
      if (funcionarioId !== relatorio.funcionario.id) {
        const funcionario = await this.funcionariosService.findOne(funcionarioId);
        if (!funcionario) 
          throw new NotFoundException(`Funcionario com ID ${funcionarioId} não encontrado!`);
        
        relatorio.funcionario = funcionario; 
      }
    }

    if(!relatorio.is_finished && updateRelatorioDto.isFinished)
      relatorio.finished_date = new Date();

    if(relatorio.is_finished && updateRelatorioDto.isFinished === false)
      relatorio.finished_date = null;

    Object.assign(relatorio, updateRelatorioDto);

    relatorio.last_update = new Date();

    const relatorioUpdated = await this.relatoriosRepository.save(relatorio);
    return relatorioUpdated;
  }

  remove(id: number) {
    return this.relatoriosRepository.delete(id).then(() => undefined);
  }
}
