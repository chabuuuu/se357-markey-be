import { IsNotEmpty } from 'class-validator';

export function IsNotEmptyAll(target: any) {
  const propertyNames = Object.getOwnPropertyNames(target.prototype);

  for (const propertyName of propertyNames) {
    if (propertyName !== 'constructor') {
      IsNotEmpty()(target.prototype, propertyName);
    }
  }
}
