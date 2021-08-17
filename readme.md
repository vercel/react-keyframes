# React Keyframes

A React component for creating frame-based animations.

![Demo](https://cloud.githubusercontent.com/assets/775227/14613178/24789406-05d6-11e6-8411-6ee929ae3f3e.gif)

## Example

The following example will render contents in `Frame` one at a time every 500 ms.

```js
import { Keyframes, Frame } from "react-keyframes";

function MyComponent() {
  return (
    <Keyframes>
      <Frame duration={500}>This</Frame>
      <Frame duration={500}>This is</Frame>
      <Frame duration={500}>
        This is <em>animated</em>.
      </Frame>
    </Keyframes>
  );
}
```

## Usage

Firstly, install the package:

```js
$ npm install --save react-keyframes
```

## API

### Keyframes

**`<Keyframes { component = 'span' } />`**

- Use `import { Keyframes } from 'react-keyframes'`
- The `component` prop specifies what component `Keyframes` renders as. You can pass the following:
  - a React Component (i.e. `<Keyframes component={myComponent} />`)
  - a React Fragment (i.e. `<Keyframes component={React.Fragment} />`)
  - an HTML tag represented as a string (i.e. `<Keyframes component='div' />`)
  - If nothing is passed, it defaults to "span"
- Any additional, user-defined properties will become properties of the rendered component.
- It must have only `Frame` as children.
- Example:

```js
import { Component } from 'react';
import { Keyframes, Frame } from 'react-keyframes';

class extends Component {
  render () {
    return <Keyframes component="pre" delay={300} className="animation-test">
      <Frame>foo</Frame>
      <Frame>bar</Frame>
    </Keyframes>;
  }
}
```

### Frame

**`<Frame { duration = 0 } />`**

- Use `import { Frame } from 'react-keyframes'`
- The `duration` prop specifies the length of time that a frame should show (millisecond).
- You have to put `Frame` in the order you want them animated.
- Example:

```js
import { Component } from 'react';
import { Keyframes, Frame } from 'react-keyframes';

class extends Component {
  render () {
    return <Keyframes>
      <Frame duration={100}>foo</Frame>
      <Frame duration={200}>bar</Frame>
    </Keyframes>;
  }
}
```

## Contributing

- Run `npm run build` to transpile the source code
- Before submitting a PR, please run `npm run test`
- Please [be welcoming](http://contributor-covenant.org/)

## Author

Naoyuki Kanezawa ([@nkzawa](https://twitter.com/nkzawa)) - [Vercel](https://vercel.com)
