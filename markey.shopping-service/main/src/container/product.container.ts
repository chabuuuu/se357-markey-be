import { ProductController } from '@/controller/product.controller';
import { ProductService } from '@/service/product.service';
import { Product } from '@/models/product.model';
import { ProductRepository } from '@/repository/product.repository';
import { IProductService } from '@/service/interface/i.product.service';
import { IProductRepository } from '@/repository/interface/i.product.repository';
import { BaseContainer } from '@/container/base.container';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { shopRepository } from '@/container/shop.container';
import { ISearchService } from '@/service/interface/i.search.service';
import { searchService } from '@/container/search.container';
import { IRecommendRepository } from '@/repository/interface/i.recommend.repository';
import { recommendRepository } from '@/container/recommend.container';

class ProductContainer extends BaseContainer {
  constructor() {
    super(Product);
    this.container.bind<IProductService<Product>>('ProductService').to(ProductService);
    this.container.bind<IProductRepository<Product>>('ProductRepository').to(ProductRepository);
    this.container.bind<ProductController>(ProductController).toSelf();

    //Import
    this.container.bind<IShopRepository<any>>('ShopRepository').toConstantValue(shopRepository);
    this.container.bind<IRecommendRepository<any>>('RecommendRepository').toConstantValue(recommendRepository);
  }

  export() {
    const productController = this.container.get<ProductController>(ProductController);
    const productService = this.container.get<IProductService<any>>('ProductService');
    const productRepository = this.container.get<IProductRepository<any>>('ProductRepository');
    return { productController, productService, productRepository };
  }
}

const productContainer = new ProductContainer();
const { productController, productService, productRepository } = productContainer.export();
export { productController, productService, productRepository };
