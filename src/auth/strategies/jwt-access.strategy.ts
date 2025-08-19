// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// function fromCookie(req: any) {
//   if (req?.cookies?.access_token) return req.cookies.access_token;
//   return null;
// }

// @Injectable()
// export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([fromCookie, ExtractJwt.fromAuthHeaderAsBearerToken()]),
//       secretOrKey: process.env.JWT_ACCESS_SECRET,
//     });
//   }

//   async validate(payload: any) {
//     // payload: { sub: userId, email, nickname }
//     return payload;
//   }
// }
