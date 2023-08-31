import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'Name must contain only letters and spaces',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'Lastname must contain only letters and spaces',
  })
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_-]*$/, {
    message:
      'Username must contain only letters, numbers, underscores, and dashes',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_=+[\]{}|;:'",.<>/?\\ ]*$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and special characters',
    },
  )
  password: string;
}
