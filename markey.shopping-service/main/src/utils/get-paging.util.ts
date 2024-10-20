import { PagingDto } from '@/dto/paging.dto';
import { Request } from 'express';

export function getPagingUtil(req: Request): PagingDto {
  const { page, rpp } = req.query;
  const paging = new PagingDto(Number(page), Number(rpp));

  return paging;
}
