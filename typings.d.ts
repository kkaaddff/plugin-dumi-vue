declare module '*.js';
declare module '*.umd';

interface Global {
  assetsCache: string;
}

declare let foo: Global['assetsCache'];
