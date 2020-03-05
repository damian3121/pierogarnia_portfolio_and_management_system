import { arrayAddUniq, arrayDel } from "./arrayUtils";
import { Setter } from "./TypeUtils";

export function checkboxMutliSelectBinding<T>(
  item: T,
  source: Array<T>,
  setter: (curr: Array<T>) => void
) {
  return function checkboxChangeHandler(_: any, next: boolean) {
    const items = next ? arrayAddUniq(source, item) : arrayDel(source, item);
    setter(items);
  }
}

export function radioValueBinding<T extends { id: any }>(
  current: T,
  selected: T | null,
): boolean {
  return (selected && (selected.id === current.id)) || false;
}

export function radioChangeBinding<T>(
  item: T,
  setSelected: Setter<T>
) {
  return (_: any, next: boolean) => {
    if (next && item) {
      setSelected(item)
    }
  }
}
