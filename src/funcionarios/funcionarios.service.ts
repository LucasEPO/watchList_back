import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Funcionarios } from './entities/funcionarios.entity';
import { Repository } from 'typeorm';
import { EmpresasService } from 'src/empresas/empresas.service';

@Injectable()
export class FuncionariosService {
  constructor(
    @Inject('FUNCIONARIOS_REPOSITORY')
    private funcionarioRepository: Repository<Funcionarios>,
    private readonly empresasService: EmpresasService
  ) {}
  
  async create(createFuncionarioDto: CreateFuncionarioDto) : Promise<Funcionarios> {
    const empresa = await this.empresasService.findOne(createFuncionarioDto.empresa_id);
    if (!empresa) 
      throw new NotFoundException(`Empresa com ID ${createFuncionarioDto.empresa_id} não encontrada!`);
    
  
    const funcionario = this.funcionarioRepository.create(createFuncionarioDto);
    funcionario.empresa = empresa; 
  
    const funcionarioSaved = await this.funcionarioRepository.save(funcionario);
  
    return funcionarioSaved;
  }

  findAll(): Promise<Funcionarios[]> {
    return this.funcionarioRepository.find({
      relations: ['empresa'] 
    });
  }
  
  findOne(id: number): Promise<Funcionarios> {
    return this.funcionarioRepository.findOne({
      where: { id },
      relations: ['empresa'] 
    });
  }

  async findFuncionariosByEmpresa(empresaId: number):  Promise<Funcionarios[]> {
    return this.funcionarioRepository.find({
      where: { empresa: { id: empresaId } },
    });
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto): Promise<any> {
    const funcionario = await this.findOne(id);
    if (!funcionario) {
      throw new NotFoundException(`Funcionario com ID ${id} não encontrado!`);
    }

    const empresaId = updateFuncionarioDto.empresa_id;
    if (empresaId !== funcionario.empresa.id) {
      const empresa = await this.empresasService.findOne(empresaId);
      if (!empresa) 
        throw new NotFoundException(`Empresa com ID ${empresaId} não encontrado!`);
      
      funcionario.empresa = empresa; 
    }

    funcionario.name = updateFuncionarioDto.name;
    funcionario.email = updateFuncionarioDto.email;

    const funcionarioUpdated = await this.funcionarioRepository.save(funcionario);
    return funcionarioUpdated
  }

  remove(id: number) {
    return this.funcionarioRepository.delete(id).then(() => undefined);
  }
}
