import { TaskStatus } from "@prisma/client";

export interface FindTaskAllOutputDTO {
  data: Array< {
  id: number;
  name: string;
  description?: string | null;
  createdAt: Date;
  finishedAt?: Date | null;
  statusId: number;  
  status: TaskStatus
  }>
};
