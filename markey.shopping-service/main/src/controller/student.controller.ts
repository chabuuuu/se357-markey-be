import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { IStudent } from '@/models/student.model';
import { IStudentService } from '@/service/interface/i.student.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class StudentController {
  public common: IBaseCrudController<IStudent>;
  private studentService: IStudentService<IStudent>;
  constructor(
    @inject('StudentService') studentService: IStudentService<IStudent>,
    @inject(ITYPES.Controller) common: IBaseCrudController<IStudent>
  ) {
    this.studentService = studentService;
    this.common = common;
  }
}
