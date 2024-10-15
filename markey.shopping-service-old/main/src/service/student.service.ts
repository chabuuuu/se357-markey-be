import { IStudent } from '@/models/student.model';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IStudentService } from '@/service/interface/i.student.service';
import { inject, injectable } from 'inversify';

@injectable()
export class StudentService extends BaseCrudService<IStudent> implements IStudentService<IStudent> {
  private studentRepository: IStudentRepository<IStudent>;

  constructor(@inject('StudentRepository') studentRepository: IStudentRepository<IStudent>) {
    super(studentRepository);
    this.studentRepository = studentRepository;
  }
}
