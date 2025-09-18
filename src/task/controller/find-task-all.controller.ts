import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { FindTaskAllService } from "../services";

@Controller()
export class FindTaskAllController {
  constructor(private readonly findTaskAllService: FindTaskAllService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  public async handle() {
    return this.findTaskAllService.execute(); 
  }
}
