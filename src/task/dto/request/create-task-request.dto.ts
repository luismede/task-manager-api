import { IsDateString, IsNotEmpty, IsOptional, MinLength } from "class-validator";


const messageMinLenght =  'da tarefa deve ter no minimo 5 caracteres'
export class CreateTaskRequestDTO {
  @IsNotEmpty({message: 'Você deve nomear a tarefa!'})
  @MinLength(5, {message: `O nome ${messageMinLenght}`})
  name: string;

  @IsDateString()
  @IsOptional()
  finishedAt?: Date;

  @MinLength(5, {message: `A descrição ${messageMinLenght}`})
  @IsOptional()
  description?: string;
}
