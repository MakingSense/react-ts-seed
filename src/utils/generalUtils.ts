export const memorize = <T>(fn: T, maxCache: number = 500) => {
  const cache: { [key: string]: any } = {};
  const memorizedFn: T = function (...args: any[]) { // tslint:disable-line
    const key: string = JSON.stringify(args);
    if (cache[key] !== (void 0)) return cache[key];
    try {
      return cache[key] = (fn as any)(...args);
    } finally {
      const keys = Object.keys(cache);
      if (keys.length > maxCache) delete cache[keys[0]];
    }
  } as any;
  return memorizedFn;
};
