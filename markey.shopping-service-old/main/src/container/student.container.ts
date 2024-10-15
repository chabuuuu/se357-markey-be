import { StudentController } from '@/controller/student.controller';
import { StudentService } from '@/service/student.service';
import { StudentRepository } from '@/repository/student.repository';
import { IStudentService } from '@/service/interface/i.student.service';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
import { BaseContainer } from '@/container/base.container';
import Student, { IStudent } from '@/models/student.model';

class StudentContainer extends BaseContainer {
  constructor() {
    super(Student);
    this.container.bind<IStudentService<IStudent>>('StudentService').to(StudentService);
    this.container.bind<IStudentRepository<IStudent>>('StudentRepository').to(StudentRepository);
    this.container.bind<StudentController>(StudentController).toSelf();
  }

  export() {
    const studentController = this.container.get<StudentController>(StudentController);
    const studentService = this.container.get<IStudentService<any>>('StudentService');

    return { studentController, studentService };
  }
}

const studentContainer = new StudentContainer();
const { studentController, studentService } = studentContainer.export();
export { studentController, studentService };
