import * as React from "react";
import './form.sass';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Form} from "react-bootstrap";

class TestForm extends React.Component<InjectedFormProps, {[state: string]: any}>{
  constructor(props: any){
    super(props);
    this.state = {
      salary: 'month',
      withTax: false
    };
  }

  salarySelector = [
    {label: 'Оклад за месяц', value: 'month'},
    {label: 'МРОТ', value: 'mrot'},
    {label: 'Оплата за день', value: 'day'},
    {label: 'Оплата за час', value: 'hour'}
  ];

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  setSalary(salary: string){
    this.setState({
      salary: salary
    });
  }

  render(){
    return (
      <div className="form">
        <Form>
          <Form.Text muted>
            Сумма
          </Form.Text>
          {this.salarySelector.map(s => (
            <Form.Check type="radio"
                        key={`salary-${s.value}`}>
              <Form.Check.Input type="radio"
                                checked={this.state.salary === s.value}
                                onChange={() => this.setSalary(s.value)}/>
              <Form.Check.Label onClick={() => this.setSalary(s.value)}>
                {s.label}
                {s.value === 'mrot' && '-i-'}
              </Form.Check.Label>
            </Form.Check>
          ))}
        </Form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'text-form'
})(TestForm);
