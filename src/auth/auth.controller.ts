import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Handle user login
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Protected endpoint that requires JWT authentication
  @Post('protected')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard for authentication
  async protected() {
    return { message: 'Hello' };
  }
}
