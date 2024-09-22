import { IsOptional, IsString } from "class-validator";

export class CreateEmpresaDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    login?: string;

    @IsOptional()
    @IsString()
    pass_hash?: string;
}
