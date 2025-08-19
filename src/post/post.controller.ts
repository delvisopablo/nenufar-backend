import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post as PostHttp,
  Query,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { QueryPostDto } from './dto/query-post.dto';

@Controller('posts')
export class PostController {
  constructor(private service: PostService) {}

  @Get()
  list(@Query() q: QueryPostDto) {
    return this.service.list(q);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.getById(id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user?: { id?: number; isAdmin?: boolean } },
  ) {
    const currentUserId = req.user?.id ?? 1; // TODO: JwtAuthGuard
    const isAdmin = !!req.user?.isAdmin;
    return this.service.remove(id, currentUserId, isAdmin);
  }

  // Likes
  @PostHttp(':id/like')
  like(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user?: { id?: number } },
  ) {
    const userId = req.user?.id ?? 1;
    return this.service.like(id, userId);
  }

  @Delete(':id/like')
  unlike(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user?: { id?: number } },
  ) {
    const userId = req.user?.id ?? 1;
    return this.service.unlike(id, userId);
  }

  @Get(':id/likes')
  likes(@Param('id', ParseIntPipe) id: number) {
    return this.service.listLikes(id);
  }

  // Comentarios mínimos
  @Get(':id/comentarios')
  comentarios(@Param('id', ParseIntPipe) id: number) {
    return this.service.listComentarios(id);
  }

  @PostHttp(':id/comentarios')
  crearComentario(
    @Param('id', ParseIntPipe) id: number,
    @Body('contenido') contenido: string,
    @Req() req: { user?: { id?: number } },
  ) {
    const userId = req.user?.id ?? 1;
    return this.service.createComentario(id, userId, contenido);
  }
}
