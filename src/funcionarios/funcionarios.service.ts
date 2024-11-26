import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Funcionarios } from './entities/funcionarios.entity';
import { Repository } from 'typeorm';
import { EmpresasService } from 'src/empresas/empresas.service';
import { CreateFuncionarioReactDto } from './dto/create-funcionario-react.dto';
import { UpdateFuncionarioReactDto } from './dto/update-funcionario-react.dto';

@Injectable()
export class FuncionariosService {
  constructor(
    @Inject('FUNCIONARIOS_REPOSITORY')
    private funcionarioRepository: Repository<Funcionarios>,
    private readonly empresasService: EmpresasService
  ) {}
  
  async create(createFuncionarioDto: CreateFuncionarioReactDto) : Promise<Funcionarios> {
    console.log(createFuncionarioDto);
    console.log(createFuncionarioDto.companyId);
    const empresa = await this.empresasService.findOne(createFuncionarioDto.companyId);
    console.log(empresa);
    if (!empresa) 
      throw new NotFoundException(`Empresa com ID ${createFuncionarioDto.companyId} não encontrada!`);
    
  
    const funcionario = this.funcionarioRepository.create(createFuncionarioDto);
    funcionario.empresa = empresa; 
    console.log(funcionario);
  
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

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioReactDto): Promise<any> {
    const funcionario = await this.findOne(id);
    if (!funcionario) {
      throw new NotFoundException(`Funcionario com ID ${id} não encontrado!`);
    }

    const empresaId = updateFuncionarioDto.companyId;
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
