import { Expose } from 'class-transformer';

export class MessageRes {
  @Expose()
  message!: string;
}
