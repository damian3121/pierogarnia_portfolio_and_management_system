// some of them are taken from https://github.com/andnp/SimplyTyped

export function notNull<T>(a: T | null | undefined, msg: string): T {
  if (a === null || a === undefined) {
    throw new Error('#notNull given parameter is null: ' + msg);
  }
  return a;
}

// use this instead of manually casting
// so we can find bugs caused
// by unsafe casts faster.
export function unsafeCast<T, U>(value: T): U {
  return value as unknown as U;
}

export type KeysByType<O extends object, T> = {
  // tslint:disable-next-line:no-unused-expression
  [k in keyof O]-?: O[k] extends T ? k : never;
  // tslint:disable-next-line:no-unused-expression
}[keyof O];



export type Setter<T> = (next: T) => void;
