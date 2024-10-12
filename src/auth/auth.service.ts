import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmpresasService } from 'src/empresas/empresas.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private empresasService: EmpresasService,
        private jwtService: JwtService
      ) {}

  async signIn(login: string, pass: string): Promise<any> {
    const empresa = await this.empresasService.findOneByLogin(login);
    if (!empresa || !bcrypt.compareSync(pass, empresa.pass_hash) ) {
      throw new UnauthorizedException();
    }

    const payload = { sub: empresa.id, username: empresa.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
      empresa_id: payload.sub
    };
  }
}