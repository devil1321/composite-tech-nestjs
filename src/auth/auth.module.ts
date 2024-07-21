import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LocalStrategyService } from './local-strategy/local-strategy.service';
import { GoogleStrategyService } from './google-strategy/google-strategy.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import * as passport from 'passport';

@Module({
  imports:[PassportModule],
  providers: [AuthService,LocalStrategyService,GoogleStrategyService,LocalAuthGuard,GoogleAuthGuard,UsersService],
  controllers: [AuthController]
})
export class AuthModule {
  constructor(private authService: AuthService) {}

  configure(consumer: MiddlewareConsumer) {
    passport.serializeUser((user: any, done) => {
      done(null, user); // Serialize user's ID
    });

    passport.deserializeUser(async (user: any, done) => {
      done(null, user);
    });
  }
}
