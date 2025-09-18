import { Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { FindTaskByIdOutputDTO } from "../dto/io/find-task-by-id.output";
import { FindTaskByIdService } from "../services";

@Controller()
export class FindTaskByIdController {
 
  constructor(private readonly findTaskByService: FindTaskByIdService) {}


  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async handle(@Param('id', ParseIntPipe) id: number): Promise<FindTaskByIdOutputDTO> {
    if (!id) throw new NotFoundException ('Informe o id da tarefa que você deseja buscar');

    return this.findTaskByService.execute({id})

  }

}
