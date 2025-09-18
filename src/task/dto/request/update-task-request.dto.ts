import {IsDate, isNumber, IsOptional, MinLength } from "class-validator"

const messageMinLenght = 'da tarefa de ter no minimo 5 letras';
export class UpdateTaskRequestDTO {
    @MinLength(1, {message: `O ${messageMinLenght}`})
  name: string;

  @IsOptional()
  @MinLength(5, {message: `A descrição ${messageMinLenght}`})
  description?: string;

  @IsOptional()
  finishedAt?: Date;

  @IsOptional() 
  statusId: number;
}

