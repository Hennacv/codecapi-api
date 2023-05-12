import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  authUrl() {
    return { url: this.authService.generateUrl() };
  }

  @Get('redirect')
  async redirectToApp(@Query('code') code: string, @Res() res: Response) {
    const idToken = await this.authService.getIdToken(code);
    res.redirect(`codecapi://${idToken}`);
  }
}
