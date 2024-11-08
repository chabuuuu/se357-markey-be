export const FindOrderWithFilterSelect = {
  id: true,
  total: true,
  status: true,
  address: true,
  shopperId: true,
  paymentId: true,
  createAt: true,
  updateAt: true,
  createBy: true,
  updateBy: true,
  items: {
    id: true,
    amount: true,
    product: {
      id: true,
      name: true,
      price: true,
      picture: true,
      description: true
    }
  }
};
