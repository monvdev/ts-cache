// Cache is a class that provides caching of generic types using a Map.
//
export class MapCache<T> {
  private cache: Map<string, T>;
  private max: number;

  // Constructor. Parameter max specifies the maximum number of items to cache.
  constructor(max: number) {
    this.cache = new Map<string, T>();
    this.max = max;
  }

  // Adds an item of generic type in the cache.
  addValue(value: T, key: string) {
    if (this.cache.has(key) && this.cache.get(key) === value) {
      // no need to add if same key and value
      return;
    }
    if (this.cache.size >= this.max) {
      // delete first item before add ing a new one
      const firstKey: string = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  // Retrieves a cached value by key. Returns default if not in cache.
  getValue(key: string): T {
    let value: T;
    if (this.cache.has(key)) {
      value = this.cache.get(key);
      // delete then set item to move used item to the end
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  // Returns size of the cache
  getSize(): number {
    return this.cache.size;
  }

  // Clears the cache
  clear(): void {
    this.cache.clear();
  }
}

// Cache is a class that provides caching of generic types using an array.
export class ArrayCache<T> {
  private cache: Array<CacheItem<T>>;
  private max: number;

  // Constructor. Parameter max specifies the maximum number of items to cache.
  constructor(max: number) {
    this.cache = new Array<CacheItem<T>>();
    this.max = max;
  }

  // Adds an item of generic type in the cache.
  addValue(value: T, key: string) {
    const index: number = this.cache.findIndex(
      (item: CacheItem<T>) => item.key === key
    );

    if (index >= 0) {
      if (this.cache[index].value === value) {
        // no need to add if same key and value
        return;
      }
      // remove element before adding again to the end of array elements
      this.cache.splice(index, 1);
    } else if (this.cache.length >= this.max) {
      // remove first item
      this.cache.shift();
    }
    // add as last element of array
    this.cache.push(new CacheItem<T>(value, key));
  }

  // Retrieves a cached value by key. Returns default if not in cache.
  getValue(key: string): T {
    let value: T;
    const index: number = this.cache.findIndex(
      (item: CacheItem<T>) => item.key === key
    );
    if (index >= 0) {
      const item = this.cache[index];
      // move used item to last
      this.cache.splice(index, 1);
      this.cache.push(item);

      value = item.value;
    }
    return value;
  }

  // Returns
  getValueByIndex(index: number): T {
    let value: T;
    if (this.cache.length > index) {
      value = this.cache[index].value;
    }
    return value;
  }

  // Return size of the cache
  getSize(): number {
    return this.cache.length;
  }

  // Clears the cache
  clear(): void {
    this.cache = new Array<CacheItem<T>>();
  }
}

// CacheItem class provides instance of a key/value object.
class CacheItem<T> {
  value: T;
  key: string;

  constructor(value: T, key: string) {
    this.value = value;
    this.key = key;
  }
}
