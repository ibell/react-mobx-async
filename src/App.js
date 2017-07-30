import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import JSONTree from 'react-json-tree'

const JSONViewer = observer(
  ({json}) => <JSONTree data={json} invertTheme={true} />                    
);
        
@observer class App extends React.Component {
  @observable fluid_json = {hi:'Ian'};
  constructor(props) {
    super(props);
    this.state = {
        fluid_name: 'Water',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fluid_json = this.state.json;
  }
  handleChange(event){
    this.setState({
      fluid_name: event.target.value
    });
  }
  handleSubmit(event){
    event.preventDefault();
    console.log(this.state.fluid_name);
    
    var url = 'https://raw.githubusercontent.com/CoolProp/CoolProp/master/dev/fluids/'+this.state.fluid_name+'.json'
    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }
    function parseJSON(response) {
      return response.json()
    }
    fetch(url)
      .then(checkStatus)
      .then(parseJSON)
      .then(function(json_data){ 
            this.fluid_json = json_data;
          }.bind(this));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
         <label>
         Input:
          <input type="text" value={this.state.fluid_name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="submit!" />
        </form>
        <JSONViewer json={this.fluid_json} />
      </div>
    );
  }
}

export default App;
