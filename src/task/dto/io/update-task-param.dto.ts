import { IsNotEmpty } from "class-validator";
import {Type} from "class-transformer";

export class UpdateTaskParamDTO {
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
