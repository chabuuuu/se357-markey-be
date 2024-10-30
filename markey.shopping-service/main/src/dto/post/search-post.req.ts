export class SearchPostReq {
  sort!: {
    by: string;
    order: 'ASC' | 'DESC';
  };

  title?: string;

  categoryId?: string;

  shopId?: string;
}
