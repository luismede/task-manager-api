import { IsNotEmpty } from "class-validator";
import {Type} from "class-transformer";

export class UpdateTaskParamDTO {
  @IsNotEmpty({message: "Você deve informar qual o id da tarefa"})
  @Type(() => Number)
  id: number;
}
