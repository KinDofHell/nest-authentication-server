import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Handle user login
  async login(loginDto: LoginDto) {
    // Find the user based on the provided name
    const user: User = await this.userService.findOne(loginDto.name);

    // Check if the user exists and the password is correct
    if (!user || user.password !== loginDto.password)
      throw new UnauthorizedException('Invalid credentials');

    // Create a payload containing the user's name
    const payload: { name: string } = { name: user.name };

    // Generate a JWT token based on the payload
    const accessToken: string = this.jwtService.sign(payload);

    // Return the generated access token
    return { accessToken };
  }
}
