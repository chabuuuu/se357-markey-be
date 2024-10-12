import { Expose } from 'class-transformer';

export class AdminDetailRes {
  @Expose()
  username!: string;
  @Expose()
  cccd!: string;
  @Expose()
  profilePicture!: string;
  @Expose()
  fullname!: string;
  @Expose()
  address!: string;
  @Expose()
  phoneNumber!: string;
  @Expose()
  birthdate!: Date;
  @Expose()
  email!: string;
}
