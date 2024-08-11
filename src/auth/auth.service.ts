import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

type AuthInput = { email: string; password: string };
type SignInData = { userId: number; email: string };
type AuthResult = { accessToken: string; userId: number; email: string };

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: 'fake-access',
      userId: user.userId,
      email: user.email,
    };
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByEmail(input.email);
    if (user && user.password === input.password) {
      return {
        userId: user.userId,
        email: user.email,
      };
    }

    return null;
  }
}
