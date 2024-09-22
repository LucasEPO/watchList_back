import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresas } from './entities/empresas.entity';
import * as bcrypt from 'bcrypt';

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

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto): Promise<any> {
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