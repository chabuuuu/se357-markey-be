import { Expose } from 'class-transformer';

// export function ExposeAll(target: any) {
//   const instance = new target();
//   const props = Object.keys(instance);

//   props.forEach((key) => Expose()(target, key));
// }

export const ExposeAll = () => (target: any, _propertyKey: string) => {
  // 1.1 Allow decorator only on class
  if (!target) {
    throw new Error('@Expose is not used on class. It must be on class. Example @Export()\nclass Sample{}');
  }

  // 1.2 Create instance of target and fetch its keys
  const instance = new target();
  const props = Object.keys(instance);

  // 1.3 Apply class-transformer expose function to each key
  props.forEach((key) => Expose()(target, key));
};
