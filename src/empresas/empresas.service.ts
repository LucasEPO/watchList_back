import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresas } from './entities/empresas.entity';
import * as bcrypt from 'bcrypt';
import { Relatorios } from 'src/relatorios/entities/relatorio.entity';
import { Funcionarios } from 'src/funcionarios/entities/funcionarios.entity';

@Injectable()
export class EmpresasService {
  constructor(
    @Inject('EMPRESAS_REPOSITORY')
    private empresaRepository: Repository<Empresas>,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresas> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createEmpresaDto.pass_hash, saltRounds);
  
    const empresa = this.empresaRepository.create({
      ...createEmpresaDto,
      pass_hash: hashedPassword,
    });
  
    const savedEmpresa = await this.empresaRepository.save(empresa);
    return savedEmpresa;
  }

  findAll(): Promise<Empresas[]> {
    return this.empresaRepository.find();
  }

  findOne(id: number): Promise<Empresas> {
    return this.empresaRepository.findOneBy({ id });
  }

  findOneByLogin(login: string): Promise<Empresas | undefined> {
    return this.empresaRepository.findOneBy({ login });
  }

  async findAllReports(id: number): Promise<Relatorios[]> {
    const empresa = await this.empresaRepository.findOne({
      where: { id },
      relations: ['relatorios', 'relatorios.funcionario'],
    });

    if (!empresa) 
      throw new Error('Empresa não encontrada');
    
    return empresa.relatorios || []; 
  }
  
  async findAllEmployees(id: number): Promise<Funcionarios[]> {
    const empresa = await this.empresaRepository.findOne({
      where: { id },
      relations: ['funcionarios'],
    });

    if (!empresa) 
      throw new Error('Empresa não encontrada');
    
    return empresa.funcionarios || []; 
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto): Promise<any> {
    const empresa = await this.findOne(id);
    if(!empresa)
      throw new NotFoundException(`Empresa com ID ${id} não encontrado!`);
    
    if (updateEmpresaDto.pass_hash) {
      const saltRounds = 10;
      updateEmpresaDto.pass_hash = await bcrypt.hash(updateEmpresaDto.pass_hash, saltRounds);
    }
    return this.empresaRepository.update(id, updateEmpresaDto);
  }

  remove(id: number): Promise<void> {
    return this.empresaRepository.delete(id).then(() => undefined);
  }
}