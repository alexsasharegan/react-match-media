import * as React from "react";
import * as dom from "./dom";
import {
  Dictionary,
  MediaQuery,
  MediaQueryAlias,
  MediaQueryBag,
  MediaQueryEntry,
  MediaQueryMatches,
  MediaQueryUnsubscribeFn,
} from "./types";

type QueryDiff = {
  subscribe: MediaQueryEntry[];
  unsubscribe: string[];
};

type Props = {
  queries: MediaQueryBag;
  children: (props: MediaQueryMatches) => React.ReactNode;
};

type State = {
  queries: Dictionary<boolean>;
};

export class MatchMedia extends React.Component<Props, State> {
  unsubscribeMap: Map<MediaQueryAlias, MediaQueryUnsubscribeFn> = new Map();

  state: State = {
    queries: this.computeMQL({}),
  };

  computeMQL(queryBag: Dictionary<boolean>): Dictionary<boolean> {
    let dict: Dictionary<boolean> = {};

    for (let alias of Object.keys(this.props.queries)) {
      dict[alias] = Boolean(queryBag[alias]);
    }

    return dict;
  }

  subscribe(entries: MediaQueryEntry[]): void {
    for (let [alias, query] of entries) {
      let unsubscribeFn = dom.addMediaQueryListener(query, mql => {
        this.setState(({ queries }) => ({
          queries: {
            ...queries,
            [alias]: mql.matches,
          },
        }));
      });

      this.unsubscribeMap.set(alias, unsubscribeFn);
    }
  }

  unsubscribe(aliases: string[]): void {
    for (let alias of aliases) {
      let unsubscribeFn = this.unsubscribeMap.get(alias);
      if (unsubscribeFn) {
        unsubscribeFn();
        this.unsubscribeMap.delete(alias);
      }
    }
  }

  componentDidMount() {
    this.subscribe(Object.entries(this.props.queries));
  }

  componentWillUnmount() {
    this.unsubscribe([...this.unsubscribeMap.keys()]);
  }

  componentDidUpdate(prevProps: Props) {
    let diff = diffQueries(prevProps.queries, this.props.queries);
    if (!diff) {
      return;
    }

    let { subscribe, unsubscribe } = diff;
    //* if we have subs/unsubs, we need to update the mql dictionary
    //* to remove unused aliases and add new aliases.
    if (subscribe.length + unsubscribe.length > 0) {
      this.setState(({ queries }) => ({
        queries: this.computeMQL(queries),
      }));
    }

    //! Must unsubscribe first
    this.unsubscribe(unsubscribe);
    this.subscribe(subscribe);
  }

  render() {
    return this.props.children({ ...this.state.queries });
  }
}

function diffQueries(
  previous: MediaQueryBag,
  current: MediaQueryBag
): QueryDiff | null {
  if (previous === current) {
    return null;
  }

  let oldQueries = new Map(Object.entries(previous));
  let subscribe: Map<MediaQueryAlias, MediaQuery> = new Map();
  let unsubscribe: MediaQueryAlias[] = [];

  for (let [alias, query] of Object.entries(current)) {
    //* NEW: subscribe
    if (!oldQueries.has(alias)) {
      subscribe.set(alias, query);
      continue;
    }

    let old_query = oldQueries.get(alias);

    //* UNCHANGED: remove from old_queries (already subscribed)
    if (old_query === query) {
      oldQueries.delete(alias);
      continue;
    }

    //* UPDATED: subscribe
    subscribe.set(alias, query);
  }

  //* Leftover keys are queries that have been updated
  //* and need old queries removed
  unsubscribe.push(...oldQueries.keys());

  return {
    subscribe: [...subscribe.entries()],
    unsubscribe,
  };
}
