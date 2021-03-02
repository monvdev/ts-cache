# ts-cache

This is an implementation of caching in TypeScript.

Files:
cache.ts - Constains 2 implementation of caching. One using Map object and another using an array.
main.ts - Entry file testing the performance of both caching classes and logs to console.
index.html - For viewing the script in browser Dev Tools.
tsconfig.json - Compiler options.

Based on the result shown in the console, the Map based cache is a lot faster than the array based one.

To run:
  - Requires installation of TypeScript to compile.
  - Download or clone repository.
  - Open terminal on root folder, run **tsc**.
  - Open index.html in browser and open Dev Tools to see entries in console.
