import { create } from 'domain';

export const ListProductSelect = {
  id: true,
  name: true,
  price: true,
  description: true,
  ratingAverage: true,
  category: {
    id: true,
    name: true
  },
  shop: {
    id: true,
    name: true
  },
  picture: true

  //BaseEntity
  // createAt: true,
  // updateAt: true,
  // createBy: true,
  // updateBy: true,
  // deleteAt: true
};
