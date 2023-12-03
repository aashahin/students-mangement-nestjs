import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { IAuthenticate, Role } from './interface/Role';
import { AuthenticateDto } from './dto/authenticate.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  users = [
    {
      id: faker.string.uuid(),
      username: 'shahin',
      password: '10801819',
      role: Role.Admin,
    },
    {
      id: faker.string.uuid(),
      username: faker.string.alpha({ length: 10 }),
      password: faker.string.numeric({ length: 8 }),
      role: Role.Admin,
    },
    {
      id: faker.string.uuid(),
      username: faker.string.alpha({ length: 10 }),
      password: faker.string.numeric({ length: 8 }),
      role: Role.User,
    },
    {
      id: faker.string.uuid(),
      username: faker.string.alpha({ length: 10 }),
      password: faker.string.numeric({ length: 8 }),
      role: Role.User,
    },
  ];

  authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
    const user = this.users.find(
      (user) =>
        user.username === authenticateDto.username &&
        user.password === authenticateDto.password,
      // bcrypt.compareSync(authenticateDto.password, user.password),
    );

    if (!user) throw new NotFoundException('Invalid credentials');

    const token = sign({ ...user }, process.env.JWT_SECRET);

    return {
      user,
      token,
    };
  }
}
