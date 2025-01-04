import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('recommends')
export class Recommend {
  @PrimaryColumn({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'products', type: 'simple-array', nullable: true })
  products?: string[];
}
