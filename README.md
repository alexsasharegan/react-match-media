# react-match-media

A render prop component that provides idiomatic react component access to the
match media API.

## Install

### NPM

```sh
npm install @alexsasharegan/react-match-media
```

### Yarn

```sh
yarn add @alexsasharegan/react-match-media
```

## Usage

### As Render Prop

```jsx
import { MatchMedia } from "@alexsasharegan/react-match-media";

function BootstrapBreakpoints(props) {
  return (
    <MatchMedia
      queries={{
        xs: "(max-width: 575px)",
        sm: "(min-width: 576px) and (max-width: 767.98px)",
        md: "(min-width: 768px) and (max-width: 991.98px)",
        lg: "(min-width: 992px) and (max-width: 1199.98px)",
        xl: "(min-width: 1200)",
      }}
    >
      {({ xs, sm, md, lg, xl }) => (
        <main>
          <h1>Match Media</h1>
          <pre>{prettyPrint({ xs, sm, md, lg, xl })}</pre>
        </main>
      )}
    </MatchMedia>
  );
}

function prettyPrint(value) {
  return JSON.stringify(value, null, 2);
}
```

### As HOC

```jsx
import { MatchMedia } from "@alexsasharegan/react-match-media";

const ExampleHOC = withBootstrapBreakpoints(function Example({ matches }) {
  return (
    <main>
      <h1>Match Media</h1>
      <pre>{prettyPrint(matches)}</pre>
    </main>
  );
});

const withBootstrapBreakpoints = Component => props => (
  <MatchMedia
    queries={{
      xs: "(max-width: 575px)",
      sm: "(min-width: 576px) and (max-width: 767.98px)",
      md: "(min-width: 768px) and (max-width: 991.98px)",
      lg: "(min-width: 992px) and (max-width: 1199.98px)",
      xl: "(min-width: 1200)",
    }}
  >
    {matches => <Component matches={matches} {...props} />}
  </MatchMedia>
);

function prettyPrint(value) {
  return JSON.stringify(value, null, 2);
}
```
