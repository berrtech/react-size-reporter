'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ResizeSensor from './vendor/ResizeSensor/ResizeSensor.js';

class SizeReporter extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onSizeChange: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
    this.ResizeSensor = null;
    this.offsetHeight = null;
    this.offsetWidth = null;
  }

  componentDidMount(){
    this.node = ReactDOM.findDOMNode(this);
    this.attachListener();
    this.props.onSizeChange({height: this.node.offsetHeight, width: this.node.offsetWidth});
  }

  componentWillUnmount(){
    if (this.ResizeSensor){
      this.ResizeSensor.detach();
    }
  }

  componentDidUpdate(){
    if (
      this.node &&
      (
        this.node.offsetHeight !== this.offsetHeight ||
        this.node.offsetWidth !== this.offsetWidth
      )
    ){
      this.props.onSizeChange({height: this.node.offsetHeight, width: this.node.offsetWidth});
    }
  }

  attachListener = () => {
    if (this.node){
      this.ResizeSensor = new ResizeSensor(
        this.node,
        () => this.props.onSizeChange({height: this.node.offsetHeight, width: this.node.offsetWidth})
      );
    }
  }

  reattachResizeListener = () => {
    this.ResizeSensor.detach();
    this.attachListener();
  }

  render(){
    const { children, onSizeChange, ...props } = this.props;

    if (this.node){
      this.offsetHeight = this.node.offsetHeight;
      this.offsetWidth = this.node.offsetWidth;
    }

    return (
      <div {...props}>
        {children || null}
      </div>
    )
  }
}

export default SizeReporter;
