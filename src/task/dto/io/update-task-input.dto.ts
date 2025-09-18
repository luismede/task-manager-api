export class UpdateTaskInputDTO {
  id: number;
  name?: string;
  description?: string;
  finishedAt?: Date | null;
  statusId?: number;
}
