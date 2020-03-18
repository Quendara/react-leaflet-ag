import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import {SimpleMap} from "./Maps"
import {PostFinder} from "./PostFinder"
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Performance tests
        </p>
        <div>
        
        <PostFinder />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
