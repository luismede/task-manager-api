import { BadRequestException, Controller, HttpCode, HttpStatus, Post, Body } from "@nestjs/common";
import { CreateTaskRequestDTO } from "../dto/request/create-task-request.dto";
import { CreateTaskOutputDTO } from "../dto/io/create-task-output.dto";
import { CreateTaskService } from "../services/create-task.service";

@Controller()
export class CreateTaskController {

  constructor(private readonly createTaskService: CreateTaskService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async handle(@Body() data: CreateTaskRequestDTO): Promise<CreateTaskOutputDTO> { 
    return await this.createTaskService.execute(data);

  }
}
