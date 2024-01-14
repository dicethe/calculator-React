import React from 'react';
import store from './store';
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       value: "0"
    }
    this.refOutput = React.createRef()
  }

click(item){
  let currentValue = item;
  let output = this.refOutput.current;

  this.setState({
    value: currentValue
  })


  if(output.value === "0" || output.value === "Infinity") {output.value = ""}
  output.value += currentValue;

}


getResult(item){
  let output = this.refOutput.current;

  if(item === "clean"){
    output.value = output.value.length === 1 ?"0":
    output.value.substring(0, output.value.length -1)
    }

     if(item === "delete"){
    output.value = "0"
  }

if(item === "="){
  if (output.value.indexOf("/0") !== -1){
    output.value = "Infinity"
  } else {
    try{output.value = eval(output.value)}   
    catch{
      output.value = "invalid value"
      setTimeout(()=>{output.value = "0"}, 1000)
  }
    }
  }

}
 
  render() {
    return (
      <div className = "container">
        <div className = "output">
          <input ref ={this.refOutput} type="text" defaultValue = {this.state.value}/>
        </div>
        <div className = "buttons">
          {store.buttons.map((item, index) => <button
            className = "button"
            key ={index}
            onClick ={() => {this.click(item.val)}}
            >{item.val}</button>)}

          {store.buttonsResult.map((item, index) => <button 
            key ={index}
            onClick ={() => {this.getResult(item.val)}}
            >{item.val}</button>)}
        </div>
      </div>
    )
  }
}