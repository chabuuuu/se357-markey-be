import { GetVnpUrl } from '@/dto/payment/get-vnp-url.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IPaymentService<T extends BaseModelType> extends IBaseCrudService<T> {
  getVnpUrl(paymentId: string, ipAddr: string): Promise<GetVnpUrl>;
}
