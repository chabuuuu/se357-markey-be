export class FindOrderWithFilterReq {
  sort!: {
    by: string;
    order: 'ASC' | 'DESC';
  };
  id?: string;
  status?: string;
  address?: string;
  shopperId?: string;
  totalFrom?: number;
  totalTo?: number;
}
