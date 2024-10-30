export class SearchSalesmanReq {
  sort!: {
    by: string;
    order: 'ASC' | 'DESC';
  };

  isBlocked?: boolean;

  isApproved?: boolean;

  fullname?: number;

  id?: string;
}
