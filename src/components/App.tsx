import * as React from "react";
import {Provider} from "react-redux";
import './App.sass';
import TestForm from "./form/form";
import store from "../store";

class App extends React.Component{
  render(){
    return (
      <div className="app">
        <Provider store={store}>
          <TestForm/>
        </Provider>
      </div>
    );
  }
}

export default App;
