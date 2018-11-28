# react-match-media

[![npm](https://img.shields.io/npm/v/@alexsasharegan/react-match-media.svg?style=for-the-badge)](https://img.shields.io/npm/v/@alexsasharegan/react-match-media)
[![npm downloads](https://img.shields.io/npm/dt/@alexsasharegan/react-match-media.svg?style=for-the-badge)](https://www.npmjs.com/package/@alexsasharegan/react-match-media)
[![GitHub issues](https://img.shields.io/github/issues/alexsasharegan/react-match-media.svg?style=for-the-badge)](https://github.com/alexsasharegan/react-match-media/issues)
[![GitHub license](https://img.shields.io/github/license/alexsasharegan/react-match-media.svg?style=for-the-badge)](https://github.com/alexsasharegan/react-match-media/blob/master/LICENSE)

A render prop component that provides idiomatic react component access to the
match media API.

[Type Documentation](https://naughty-kalam-69f73a.netlify.com/)

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
        xs: "(max-width: 575.98px)",
        sm: "(min-width: 576px) and (max-width: 767.98px)",
        md: "(min-width: 768px) and (max-width: 991.98px)",
        lg: "(min-width: 992px) and (max-width: 1199.98px)",
        xl: "(min-width: 1200px)",
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
      xs: "(max-width: 575.98px)",
      sm: "(min-width: 576px) and (max-width: 767.98px)",
      md: "(min-width: 768px) and (max-width: 991.98px)",
      lg: "(min-width: 992px) and (max-width: 1199.98px)",
      xl: "(min-width: 1200px)",
    }}
  >
    {matches => <Component matches={matches} {...props} />}
  </MatchMedia>
);

function prettyPrint(value) {
  return JSON.stringify(value, null, 2);
}
```
