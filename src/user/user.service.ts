import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.lastname = createUserDto.lastname;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.phone = createUserDto.phone;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }

  async findUserByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
