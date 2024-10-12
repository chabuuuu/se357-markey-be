import { Expose } from 'class-transformer';

export class AdminLoginRes {
  @Expose()
  token!: string;

  constructor(token: string) {
    this.token = token;
  }
}
