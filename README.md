# react-size-reporter [![npm](https://img.shields.io/npm/v/react-size-reporter.svg?style=flat-square)](https://www.npmjs.com/package/react-size-reporter)

React component-wrapper detecting size changes of its children.

Heavily inspired by [react-height](https://github.com/nkbt/react-height/) but somehow it wasn't accurate enough so I tried to make my own implementation.
This implementation uses ResizeSensor from [css-element-queries](https://github.com/marcj/css-element-queries)

## Installation

### NPM

```sh
npm install --save react react-dom react-size-reporter
```

Don't forget to manually install peer dependencies (`react`, `react-dom`) if you use npm@3.

## Usage
```js
import SizeReporter from 'react-size-reporter';

<SizeReporter onSizeChange={({height, width}) => console.log(height, width)}>
  <div>CONTENT GOES HERE</div>
  <div>AND HERE</div>
</SizeReporter>
```

## Options


#### `onSizeChange`: PropTypes.func.isRequired

Callback called on mount and size changes


#### `children`: PropTypes.node.isRequired

Children with static or dynamic height or width

#### Pass-through props

You can pass any valid props, like `style` or `className` to SizeReporter, they will be applied to container

## Public methods

#### `reattachResizeListener`

Use this if for any reason `onSizeChange` doesn't trigger anymore

```js
reattach = () => this.sizeReporter.reattachResizeListener()

render(){
  return (
  <SizeReporter 
    onSizeChange={({height, width}) => console.log(height, width)}
    ref={ref => ref ? this.sizeReporter = ref : null}
  >
    <div>CONTENT GOES HERE</div>
    <div>AND HERE</div>
    <button type='button' onClick={this.reattach}>Reattach!</button>
  </SizeReporter>
  )
}
```

## Run

To run example, use `npm start` and then go to http://localhost:8080

## License

MIT
