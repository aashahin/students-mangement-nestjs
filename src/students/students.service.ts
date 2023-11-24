import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student-dto/create-student-dto';
import { UpdateStudentDto } from './dto/update-student-dto/update-student-dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException(
        `This Student ${id} is not found in us databases`,
      );
    } else {
      return student;
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const updatedStudent = await this.studentRepository.preload({
      id: +id,
      ...updateStudentDto,
    });

    if (!updatedStudent) {
      console.log('updatedStudent', updatedStudent);
      throw new NotFoundException(
        `This Student ${id} is not found in us databases`,
      );
    } else {
      return this.studentRepository.save(updatedStudent);
    }
  }

  async delete(id: number) {
    return this.studentRepository.delete(id);
  }
}
