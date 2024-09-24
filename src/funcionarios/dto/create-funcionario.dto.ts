import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsEmail } from "class-validator";

export class CreateFuncionarioDto {
    @ApiProperty({
        description: 'Nome do Funcionario',
        example: 'John Doe',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Email do funcionario',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Id da empresa que o funcionario pertence',
        example: 1,
    })
    @IsInt()
    empresa_id?: number;
}