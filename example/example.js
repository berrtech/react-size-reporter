'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import SizeReporter from '../src/ReactSizeReporter.js';

const appRoot = document.createElement('div');

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

const containerStyles = {
  width: '400px',
  margin: '0 auto'
}

const nodeStyles = {
  border: '3px solid grey',
  display: 'inline-block'
}

const nodeWrapperStyles = {
  paddingTop: '10px',
  display: 'inline-block'
}

const textareaStyles = {
  width: '100%',
  height: '100px'
}

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      height: 0,
      width: 0,
      value: '',
      nodes: []
    }
  }

  updateSize = ({height, width}) => this.setState({height, width})

  updateValue = e => this.setState({value: e.target.value})

  addNode = e => {
    e.preventDefault();


    const { nodes, value } = this.state;

    this.setState({
      nodes: [
        ...nodes,
        value.replaceAll('\n', '<br/>')
      ],
      value: ''
    })
  }

  removeNode = index => {
    const updatedNodes = [...this.state.nodes];
    updatedNodes.splice(index, 1);
    this.setState({
      nodes: updatedNodes
    })
  }

  render(){
    const { height, width, nodes, value } = this.state;
    const { updateSize, addNode, removeNode, updateValue } = this;

    return (
      <div style={containerStyles}>
        <div>
          <form onSubmit={addNode}>
            <textarea style={textareaStyles} value={value} onChange={updateValue}/>
            <button type='submit'>Add node!</button>
          </form>
        </div>
        <br/>
        <br/>

        <div>Calculated dimensions: height - {height}, width - {width} </div>

        <SizeReporter onSizeChange={updateSize} style={{display: 'inline-block'}}>
          {
            nodes.map((node, index) => (
              <div key={index} style={nodeWrapperStyles}>
                <div style={nodeStyles} dangerouslySetInnerHTML={{__html: node}}/>
                <button type='button' onClick={() => removeNode(index)}>Remove node!</button>
              </div>
            ))
          }
        </SizeReporter>
      </div>
    )
  }
}

appRoot.id = 'app';
document.body.appendChild(appRoot);
ReactDOM.render(<App />, appRoot);
