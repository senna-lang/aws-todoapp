export type PostFetcher = <T, U>(
   url: string,
   arg: {
     arg: T;
   },
 ) => Promise<U>;