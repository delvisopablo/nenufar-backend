// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// function fromCookie(req: any) {
//   if (req?.cookies?.refresh_token) return req.cookies.refresh_token;
//   return null;
// }

// @Injectable()
// export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([fromCookie, ExtractJwt.fromAuthHeaderAsBearerToken()]),
//       secretOrKey: process.env.JWT_REFRESH_SECRET,
//     });
//   }
//   async validate(payload: any) {
//     return payload;
//   }
// }
