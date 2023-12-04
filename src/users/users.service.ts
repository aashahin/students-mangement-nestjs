import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!user && user.password !== password) {
      throw new NotFoundException('Invalid Credentials');
    }

    const token = sign({ ...user }, process.env.JWT_SECRET);

    return { ...user, token };
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async register(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
