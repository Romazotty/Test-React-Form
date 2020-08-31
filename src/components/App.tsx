import * as React from "react";
import {Provider} from "react-redux";
import './App.sass';
import TestForm from "./form/form";
import store from "../store";

class App extends React.Component{
  initialValues = {
    salaryFormat: 40000,
    type: 'month',
    tax: '1'
  };

  render(){
    return (
      <div className="app">
        <Provider store={store}>
          <TestForm initialValues={this.initialValues}/>
        </Provider>
      </div>
    );
  }
}

export default App;
