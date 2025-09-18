import { Module } from "@nestjs/common";
import { 
  CreateTaskController,
  DeleteTaskController,
  FindTaskByIdController,
  FindTaskAllController,
  UpdateTaskController
} 
from './controller';


import { 
  CreateTaskService,
  DeleteTaskService,
  FindTaskByIdService,
  FindTaskAllService,
  UpdateTaskService
} 
from "./services";

@Module({
    controllers: [
      CreateTaskController,
      DeleteTaskController,
      FindTaskByIdController,
      FindTaskAllController,
      UpdateTaskController
    ],
    providers: [
    CreateTaskService,
    DeleteTaskService,
    FindTaskByIdService,
    FindTaskAllService,
    UpdateTaskService
  ]
})

export class TaskModule {}
