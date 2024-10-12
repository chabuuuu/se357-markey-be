import { IsOptional } from 'class-validator';

export function IsOptionalAll(target: any) {
  const propertyNames = Object.getOwnPropertyNames(target.prototype);

  for (const propertyName of propertyNames) {
    if (propertyName !== 'constructor') {
      IsOptional()(target.prototype, propertyName);
    }
  }
}
