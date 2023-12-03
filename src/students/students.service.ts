import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const courses = await Promise.all(
      createStudentDto.courses.map((course) =>
        this.preloadCourseByName(course),
      ),
    );
    const student = this.studentRepository.create({
      ...createStudentDto,
      courses,
    });
    return this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find({
      relations: ['courses'],
    });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['courses'],
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
    const courses =
      updateStudentDto.courses &&
      (await Promise.all(
        updateStudentDto.courses.map((course) =>
          this.preloadCourseByName(course),
        ),
      ));

    const updatedStudent = await this.studentRepository.preload({
      id: +id,
      ...updateStudentDto,
      courses,
    });

    if (!updatedStudent) {
      throw new NotFoundException(
        `Thi  s Student ${id} is not found in us databases`,
      );
    } else {
      return this.studentRepository.save(updatedStudent);
    }
  }

  async delete(id: number) {
    return this.studentRepository.delete(id);
  }

  private async preloadCourseByName(name: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { name },
    });
    if (course) {
      return course;
    }
    return this.courseRepository.create({
      name,
    });
  }
}
