import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from '../user/user.model';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

@Module({
  imports: [
    // Import the User schema from Mongoose
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // Enable Passport.js for authentication
    PassportModule,
    // Configure JWT module
    JwtModule.register({
      secret: process.env.SECRET_KEY, // Set JWT secret key from environment variable
      signOptions: { expiresIn: '1h' }, // Set JWT token expiration
    }),
  ],
  controllers: [AuthController], // Specify the AuthController as a controller for this module
  providers: [AuthService, UserService, JwtStrategy], // Provide AuthService, UserService, and JwtStrategy
})
export class AuthModule {}
