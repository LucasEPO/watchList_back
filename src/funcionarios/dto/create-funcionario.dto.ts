import { IsOptional, IsString, IsInt, IsEmail } from "class-validator";

export class CreateFuncionarioDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsInt()
    empresa_id?: number;
}