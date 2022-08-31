import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers?.authorization?.split(' ')[1];

    try {
      const validated = await this.jwtService.verify(accessToken, {
        publicKey: this.configService.get<string>('JWT_SECRET'),
      });
      if (validated) return next();
    } catch (error) {
      throw new UnauthorizedException('unauthorized');
    }
  }
}
