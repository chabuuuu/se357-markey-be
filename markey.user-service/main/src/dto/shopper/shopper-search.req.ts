export class ShopperSearchReq {
  sort?: {
    by: string;
    order: 'ASC' | 'DESC';
  };

  email?: string;

  phoneNumber?: string;

  gender?: string;

  address?: string;

  username?: string;

  isBlocked?: boolean;

  fullname?: number;

  id?: string;
}
