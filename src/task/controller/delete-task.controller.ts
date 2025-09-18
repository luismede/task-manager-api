import { BadRequestException, ConflictException, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { DeleteTaskService } from "../services";
import { DeleteTaskOutputDTO } from "../dto/io/delete-task-output.dto";


@Controller()
export class DeleteTaskController {
  constructor(private readonly deleteTaskService: DeleteTaskService) {}
  
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async handle(@Param('id', ParseIntPipe) id: number): Promise<DeleteTaskOutputDTO> {
    if (!id) throw new BadRequestException ('Informe o id da tarefa que deseja deletar!');;
    return  this.deleteTaskService.execute({id});
  } 
}
