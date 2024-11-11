import { productRepository } from '@/container/product.container';
import { IProductRepository } from '@/repository/interface/i.product.repository';
import { ISearchService } from '@/service/interface/i.search.service';
import { SearchService } from '@/service/search.service';
import { Container } from 'inversify';

class SearchContainer {
  private container = new Container();
  constructor() {
    this.container.bind<ISearchService>('SearchService').to(SearchService);
  }
  export() {
    const searchService = this.container.get<ISearchService>('SearchService');

    return { searchService };
  }
}

const searchContainer = new SearchContainer();
const { searchService } = searchContainer.export();
export { searchService };
