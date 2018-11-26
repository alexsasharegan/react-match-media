export interface BasicMediaQueryList {
  readonly matches: boolean;
  readonly media: string;
}

export type MediaQuery = string;
export type MediaQueryAlias = string;
export type MediaQueryBag = { [alias: string]: MediaQuery };
export type MediaQueryEntry = [MediaQueryAlias, MediaQuery];
export type MediaQueryListener = (mql: BasicMediaQueryList) => void;
export type MediaQueryMatches = { [alias: string]: boolean };
export type MediaQueryUnsubscribeFn = () => void;

export type Dictionary<T> = { [key: string]: T };
