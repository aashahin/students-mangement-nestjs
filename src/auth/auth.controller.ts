import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { Response } from 'express';
import { JwtGuard } from './jwt/jwt.guard';
import { Roles } from './roles/roles.decorator';
import { RoleGuard } from './role/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Res() res: Response, @Body() authenticateDto: AuthenticateDto) {
    try {
      const response = this.authService.authenticate(authenticateDto);
      return res.status(200).json({
        response,
      });
    } catch (err) {
      return res.status(404).json(err);
    }
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  profile(
    @Req() req: { user: { id: number; username: string; role: string } },
    @Res() res: Response,
  ) {
    return res.status(200).json(req?.user);
  }
}
