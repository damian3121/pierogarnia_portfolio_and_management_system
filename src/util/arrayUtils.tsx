export function arrayAddUniq<T>(arr: Array<T>, item: T): Array<T> {
  return arrayDel(arr, item).concat(item);
}

export function arrayDel<T>(arr: Array<T>, item: T): Array<T> {
  return arr.filter(it => it !== item);
}

export function arrayFindElementById<T extends { id: any }>(arr: Array<T>, id: number): T | undefined {
  return arr.find(it => it.id === id);
}

export function arrayContains<T>(
  items: Array<T>,
  item: T | null,
  areEqual: (first: T, second: T) => boolean
) {
  if (item === null) {
    return false;
  }
  const found = items.find(it => areEqual(it, item));
  return found !== undefined;
}

export function mergeById<T extends { id: any }>(
  src: Array<T>,
  append: Array<T>
): Array<T> {

  return src.concat(append.filter(appended =>
    !(src.find(srcItem => srcItem.id !== appended.id))
  ))
}

export function arrayUpdateById<T extends { id: any }>(arr: Array<T>, update: T): Array<T> {
  const out: Array<T> = [];
  let found = false;
  for (const item of arr) {
    if (item.id === update.id) {
      out.push(update);
      found = true;
    } else {
      out.push(item);
    }
  }
  if (found) {
    return out;
  } else {
    return [update].concat(out);
  }
}


export function arrayPartition<T>(
  source: Array<T>,
  splitter: (item: T) => boolean
): [Array<T>, Array<T>] {
  const truthy = [];
  const falsy = [];


  for (const item of source) {
    if (splitter(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }

  return [truthy, falsy];

}
