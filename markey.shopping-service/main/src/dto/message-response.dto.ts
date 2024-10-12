import { Expose } from 'class-transformer';

export class MessageResponseDto {
  @Expose()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
