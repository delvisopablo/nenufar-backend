import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ResenaModule } from './reseña/resena.module';
import { NegocioModule } from './negocio/negocio.module';
import { PrismaService } from '../prisma/prisma.service';
import { PromocionModule } from './promocion/promocion.module';
import { LogroModule } from './logro/logro.module';
import { ReservaModule } from './reserva/reserva.module';
import { ProductoModule } from './producto/producto.module';
import { JwtModule } from '@nestjs/jwt';
import { NegocioController } from './negocio/negocio.controller';
import { PromocionController } from './promocion/promocion.controller';
import { ResenaController } from './reseña/resena.controller';
import { CategoriaModule } from './categoria/categoria.module';
import { PostModule } from './post/post.module';
import { PetalosModule } from './petalos/petalos.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    AuthModule,
    UsuarioModule,
    ResenaModule,
    CommonModule,
    NegocioModule,
    ReservaModule,
    PromocionModule,
    LogroModule,
    CategoriaModule,
    PostModule,
    ProductoModule,
    PetalosModule,
    PedidoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    AppController,
    NegocioController,
    PromocionController,
    ResenaController,
  ],
  providers: [AppService, PrismaService],
})
export class AppModule {}
