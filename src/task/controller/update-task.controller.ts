import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Param, Put } from "@nestjs/common";
import { UpdateTaskRequestDTO} from "../dto/request/update-task-request.dto"
import { UpdateTaskOutputDTO } from "../dto/io/update-task-output.dto";
import {UpdateTaskParamDTO} from "../dto/io/update-task-param.dto"
import { UpdateTaskService } from "../services";

@Controller()
export class UpdateTaskController {
  constructor (private readonly updateTaskService: UpdateTaskService) {}


  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async handle(@Param() {id}: UpdateTaskParamDTO, @Body() data: UpdateTaskRequestDTO): Promise<UpdateTaskOutputDTO> {
    return this.updateTaskService.execute({...data, id})
  }
}

