import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { RoleGuard } from '../auth/role/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: Record<string, any>) {
    return this.usersService.login(loginDto.username, loginDto.password);
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() user: User) {
    return this.usersService.register(user);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RoleGuard)
  @Get('profile')
  async profile(
    @Req() req: Record<string, any>,
    @Res() res: Record<string, any>,
  ) {
    return res.json(req.user);
  }
}
