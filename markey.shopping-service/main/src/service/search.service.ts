import { RedisSchema } from '@/enums/redis-schema.enum';
import { Product } from '@/models/product.model';
import { IProductRepository } from '@/repository/interface/i.product.repository';
import { ISearchService } from '@/service/interface/i.search.service';
import { normalizeTextUtil } from '@/utils/normalize-text.util';
import redis from '@/utils/redis/redis.util';
import { inject, injectable } from 'inversify';
import lunr, { Index } from 'lunr';

@injectable()
export class SearchService implements ISearchService {
  async deleteProductIndex(): Promise<void> {
    await redis.del(RedisSchema.productSearchIndex);
  }
  async saveProductIndex(products: Product[]): Promise<void> {
    const idx = lunr(function () {
      this.field('name');
      this.ref('id');
      products.forEach((product) => {
        this.add({
          id: product.id,
          name: normalizeTextUtil(product.name)
        });
      });
    });

    //Save index to redis
    await redis.set(RedisSchema.productSearchIndex, JSON.stringify(idx));
  }
  async loadProductIndex(): Promise<Index | null> {
    const indexData = await redis.get(RedisSchema.productSearchIndex);
    if (!indexData) {
      return null;
    }

    return lunr.Index.load(JSON.parse(indexData));
  }
}
