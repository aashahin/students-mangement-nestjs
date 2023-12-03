import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsServices: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsServices.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsServices.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.studentsServices.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsServices.update(id, updateStudentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.studentsServices.delete(id);
  }
}
