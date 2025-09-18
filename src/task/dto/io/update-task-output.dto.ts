import { TaskStatus } from "@prisma/client";

export class UpdateTaskOutputDTO {
  id: number;
  description?: string | null;
  createdAt: Date;
  finishedAt?: Date | null;
  statusId: number;
  status: TaskStatus
}
