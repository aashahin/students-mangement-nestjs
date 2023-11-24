import { IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly age: number;
  @IsArray()
  readonly address: [];
}
