import { ProductRatingController } from '@/controller/product_rating.controller';
import { ProductRatingService } from '@/service/product_rating.service';
import { ProductRating } from '@/models/product_rating.model';
import { ProductRatingRepository } from '@/repository/product_rating.repository';
import { IProductRatingService } from '@/service/interface/i.product_rating.service';
import { IProductRatingRepository } from '@/repository/interface/i.product_rating.repository';
import { BaseContainer } from '@/container/base.container';

class ProductRatingContainer extends BaseContainer {
  constructor() {
    super(ProductRating);
this.container.bind<IProductRatingService<ProductRating>>('ProductRatingService').to(ProductRatingService);
this.container.bind<IProductRatingRepository<ProductRating>>('ProductRatingRepository').to(ProductRatingRepository);
this.container.bind<ProductRatingController>(ProductRatingController).toSelf();
}

export() {
const productRatingController = this.container.get<ProductRatingController>(ProductRatingController);
    const productRatingService = this.container.get<IProductRatingService<any>>('ProductRatingService');
return { productRatingController, productRatingService };
}
}

const productRatingContainer = new ProductRatingContainer();
const { productRatingController, productRatingService } = productRatingContainer.export();
export { productRatingController, productRatingService };