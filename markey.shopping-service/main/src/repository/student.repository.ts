import { BaseRepository } from '@/repository/base/base.repository';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
import Student, { IStudent } from '@/models/student.model';
import 'reflect-metadata';

export class StudentRepository extends BaseRepository<IStudent> implements IStudentRepository<IStudent> {
  constructor() {
    super(Student);
  }
}
