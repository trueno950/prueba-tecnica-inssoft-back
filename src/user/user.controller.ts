import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async loginUser(@Body() loginDto: { username: string; password: string }) {
    const user = await this.userService.findUserByUsernameAndPassword(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const response = {
      message: 'Login successful',
      statusCode: HttpStatus.OK,
      user,
    };
    return response;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      const response = {
        message: 'User created',
        statusCode: HttpStatus.CREATED,
        user,
      };
      return response;
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.includes('email')) {
          throw new HttpException('Email already exists', HttpStatus.CONFLICT);
        } else if (error.detail.includes('username')) {
          throw new HttpException(
            'Username already exists',
            HttpStatus.CONFLICT,
          );
        } else {
          throw new HttpException(
            'Unique constraint violation',
            HttpStatus.CONFLICT,
          );
        }
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
