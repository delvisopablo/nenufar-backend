import { Body, Controller, Get, Query, Req } from '@nestjs/common';
import { PetalosService } from './petalos.service';

@Controller('me/petalos')
export class PetalosController {
  constructor(private service: PetalosService) {}

  /** GET /me/petalos/balance */
  @Get('balance')
  balance(@Req() req: { user?: { id?: number } }) {
    const userId = req.user?.id ?? 1; // TODO: JwtAuthGuard
    return this.service.balance(userId);
  }

  /** GET /me/petalos/tx?page=&limit= */
  @Get('tx')
  ledger(
    @Req() req: { user?: { id?: number } },
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const userId = req.user?.id ?? 1;
    return this.service.ledger(userId, page, limit);
  }
}
