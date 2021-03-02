import { MapCache, ArrayCache } from "./cache";

(() => {
  let elapsed = (() => {
    let start: number;
    return {
      start: () => {
        start = Date.now();
      },
      end: (): number => {
        return Date.now() - start;
      },
    };
  })();

  // list of 2000 random numbers between 1 to 10000
  const keys = [];
  for (let i = 0; i < 2000; i++) {
    keys.push(`${Math.floor(Math.random() * 10000 + 1)}`);
  }
  console.log(`keys: size = ${keys.length}`);

  const size = 1000;
  elapsed.start();

  // Create caching using the MapCache class allowing up to 1000 items
  const mapCache: MapCache<number> = new MapCache(size);
  // Adds and gets 2000 items but only the last 1000 will be cached, logs the duration
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    mapCache.addValue(parseInt(key), key);
  }
  console.log(`MapCache: size = ${mapCache.getSize()}`);
  console.log(
    `MapCache.addValue() ${size} times: ${elapsed.end()} milliseconds`
  );
  elapsed.start();
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    mapCache.getValue(key);
  }
  console.log(
    `MapCache.getValue() ${size} times: ${elapsed.end()} milliseconds`
  );

  elapsed.start();

  // Create caching using the MapCache class
  const arrCache: ArrayCache<number> = new ArrayCache(size);
  // Adds and gets 2000 items but only the last 1000 will be cached, logs the duration
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    arrCache.addValue(parseInt(key), key);
  }
  console.log(`ArrayCache: size = ${arrCache.getSize()}`);
  console.log(
    `ArrayCache.addValue() ${size} times: ${elapsed.end()} milliseconds`
  );

  elapsed.start();
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    arrCache.getValue(key);
  }
  console.log(
    `ArrayCache.getValue() ${size} times: ${elapsed.end()} milliseconds`
  );

  // logs the items trying to cache and the 2 cache objects
  console.log(keys);
  console.log(mapCache);
  console.log(arrCache);
})();
