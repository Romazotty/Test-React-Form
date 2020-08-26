import * as React from 'react';
import './form.sass';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Form} from 'react-bootstrap';

class TestForm extends React.Component<InjectedFormProps, { [state: string]: any }> {
  constructor(props: any) {
    super(props);

    this.state = {
      salary: 0,
      type: 'month',
      tax: true
    };

    this.handleChange = this.handleChange.bind(this);
  }

  types = [
    {
      label: 'Оклад за месяц',
      value: 'month'
    },
    {
      label: 'МРОТ',
      value: 'mrot'
    },
    {
      label: 'Оплата за день',
      value: 'day'
    },
    {
      label: 'Оплата за час',
      value: 'hour'
    }
  ];

  setType(type: string) {
    this.setState({
      type: type
    });
  }

  setTax() {
    this.setState({
      tax: !this.state.tax
    });
  }

  handleChange(event: any) {
    this.setState({
      salary: event.target.value
    });
  }

  getSalary() {
    return this.state.tax ? this.state.salary : (this.state.salary * 0.87).toFixed();
  }

  getSalaryWithTax() {
    return this.state.tax ? (this.state.salary / 0.87).toFixed() : this.state.salary;
  }

  render() {
    return (
      <Form>
        <div className="text">Сумма</div>

        {
          this.types.map(type => (
            <div className="radio-container" key={type.value}
                 onClick={() => this.setType(type.value)}>
              <div className={'radio ' + (this.state.type === type.value && 'checked')}/>
              <div className="label">
                {type.label}{type.value === 'mrot' && <Notice/>}
              </div>
            </div>
          ))
        }

        <div className="tax-container">
          <div className={'tax ' + (!this.state.tax && 'checked')}
               onClick={() => this.setTax()}>
            Указать с НДФЛ
          </div>

          <Form.Check type="switch">
            <Form.Check.Input type="checkbox"
                              checked={this.state.tax}
                              onChange={() => this.setTax()}/>
            <Form.Check.Label/>
          </Form.Check>

          <div className={'tax ' + (this.state.tax && 'checked')}
               onClick={() => this.setTax()}>
            Без НДФЛ
          </div>
        </div>

        <div className="sum">
          <Field type="text"
                 name="value"
                 component="input"
                 value={this.state.value}
                 onChange={this.handleChange}/> P
        </div>

        {
          this.state.type === 'month' &&
          <div className="result">
            <div className="string">
              {this.getSalary()} P сотрудник будет получать на руки
            </div>
            <div className="string">
              {this.getSalaryWithTax() - this.getSalary()} P НДФЛ, 13% от оклада
            </div>
            <div className="string">
              {this.getSalaryWithTax()} P за сотрудника в месяц
            </div>
          </div>
        }
      </Form>
    );
  }
}

export default reduxForm({
  form: 'text-form'
})(TestForm);

class Notice extends React.Component<any, { [state: string]: any }> {
  constructor(props: any) {
    super(props);

    this.state = {
      noticeHover: false,
      noticeClick: false
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleHover(visible: boolean) {
    this.setState({
      noticeHover: visible
    });
  }

  handleClick(visible: boolean, e: any) {
    e.stopPropagation();

    this.setState({
      noticeClick: visible
    });
  }

  render() {
    return (
      <div className="notice-container">
        {
          this.state.noticeClick
            ?
            <div className="icon hide"
                 onClick={(e) => this.handleClick(false, e)}>
              x
            </div>
            :
            <div className="icon show"
                 onClick={(e) => this.handleClick(true, e)}
                 onMouseEnter={() => this.handleHover(true)}
                 onMouseLeave={() => this.handleHover(false)}>
              i
            </div>
        }
        {
          (this.state.noticeHover || this.state.noticeClick) &&
          <div className="notice">
            МРОТ - минимальный размер оплаты труда. Разный для разных регионов
          </div>
        }
      </div>
    );
  }
}
