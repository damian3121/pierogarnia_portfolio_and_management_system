/**
 * @example classNames(k1, trueCond && k2, k3, falseCond && k4) => 'k1 k2 k3'
 */
export function classNames(...klasses: Array<string | false | undefined | null>) {
  const builder: Array<string> = [];
  for (const k of klasses) {
    if (k) {
      builder.push(k);
    }
  }
  return builder.join(' ');
}