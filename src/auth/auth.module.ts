import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../prisma/prisma.service';
// import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
// import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    // JwtAccessStrategy,
    // JwtRefreshStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
