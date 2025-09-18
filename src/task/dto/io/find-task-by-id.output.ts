import { TaskStatus } from "@prisma/client";

export class FindTaskByIdOutputDTO {
  id: number;
  name: string;
  description?: string | null;
  createdAt: Date;
  finishedAt?: Date | null;
  statusId: number;
  status: TaskStatus; 
}
