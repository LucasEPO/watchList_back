import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiProperty({
        description: 'O login da empresa', 
        example: 'empresa123' 
    })
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty({ 
        description: 'A senha da empresa', 
        example: 'senhaSecreta!' 
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}