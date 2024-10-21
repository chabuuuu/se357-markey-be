export enum OrderStatusEnum {
  NOT_PAID = 'Chưa thanh toán',
  PENDING = 'Đang chờ xử lý',
  APPROVED_AND_PREPARING_FOR_DELIVERY = 'Đã duyệt và đang chuẩn bị giao hàng',
  DELIVERED_TO_TRANSPORTER = 'Đã giao cho đơn vị vận chuyển',
  DELIVERING = 'Đang giao hàng',
  REJECTED = 'Đã từ chối',
  DELIVERY_FAILED = 'Giao hàng thất bại',
  COMPLETED = 'Hoàn thành'
}
