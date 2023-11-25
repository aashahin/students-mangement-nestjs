import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly age: number;
  @IsArray({ each: true })
  readonly address: [];
  @IsArray({ each: true })
  readonly courses: [];
}
