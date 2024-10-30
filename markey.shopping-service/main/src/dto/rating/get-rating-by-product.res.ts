import { ProductRating } from '@/models/product_rating.model';

export class GetRatingByProductRes {
  average!: number | undefined;

  totalRating1!: number;
  totalRating2!: number;
  totalRating3!: number;
  totalRating4!: number;
  totalRating5!: number;

  totalReviewer!: number;

  ratings!: ProductRating[];
}
