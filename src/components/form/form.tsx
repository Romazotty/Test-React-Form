import * as React from 'react';
import './form.sass';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import {Form} from 'react-bootstrap';
import {connect} from "react-redux";

let TestForm: any = (props: any) => {
  const {type, tax, salary, sum, formatNumber} = props;
  const types = [
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

  return (
    <form>
      <div className="text">Сумма</div>

      {
        types.map(t => (
          <label className="radio-container" key={t.value}>
            <Field name="type" component="input" type="radio" value={t.value} hidden/>
            <div className={'radio ' + (type === t.value && 'checked')}/>
            <div className="label">
              {t.label}{t.value === 'mrot' && <Notice/>}
            </div>
          </label>
        ))
      }

      <div className="tax-container">
        <label className={'tax ' + (tax === '0' && 'checked')}>
          <Field name="tax" component="input" type="radio" value="0" hidden/>
          Указать с НДФЛ
        </label>

        <Form.Check type="switch">
          <Form.Check.Input type="checkbox"
                            checked={tax === '1'}
                            onChange={() => {}}/>
          <Form.Check.Label/>
        </Form.Check>

        <label className={'tax ' + (tax === '1' && 'checked')}>
          <Field name="tax" component="input" type="radio" value="1" hidden/>
          Без НДФЛ
        </label>
      </div>

      <div className="input-container">
        <Field name="salaryFormat"
               component="input"
               type="text"
               format={formatNumber}
               normalize={formatNumber}/> &#8381;
      </div>

      {
        type === 'month' &&
        <div className="result-container">
          <div className="result">
            <strong>{formatNumber(salary)} &#8381; </strong>
            сотрудник будет получать на руки
          </div>
          <div className="result">
            <strong>{formatNumber(sum - salary)} &#8381; </strong>
            НДФЛ, 13% от оклада
          </div>
          <div className="result">
            <strong>{formatNumber(sum)} &#8381; </strong>
            за сотрудника в месяц
          </div>
        </div>
      }
    </form>
  );
};

TestForm = reduxForm({
  form: 'test-form',
  enableReinitialize: true
})(TestForm);

const selector = formValueSelector('test-form');

TestForm = connect(
  state => {
    const formatNumber = (s: number) => {
      if (!s) {
        return
      }

      let arr = s.toString().split(' ').join('').split('').reverse();
      let res: any[] = [];

      arr.forEach((el: any, i: number) => {
        res.push(el);
        if ((i + 1) % 3 === 0 && arr.length !== (i + 1)) {
          res.push(' ')
        }
      });

      return res.reverse().join('');
    };

    const type: string = selector(state, 'type');
    const tax: string = selector(state, 'tax');
    const salaryFormat: number = +(selector(state, 'salaryFormat') || 0).toString().split(' ').join('');
    const salary: number = tax === '1' ? salaryFormat : +(salaryFormat * 0.87).toFixed();
    const sum: number = tax === '1' ? +(salaryFormat / 0.87).toFixed() : salaryFormat;

    return {
      type,
      tax,
      salary,
      sum,
      formatNumber
    }
  }
)(TestForm);

export default TestForm

class Notice extends React.Component<any, {[state: string]: any}>{
  constructor(props: any){
    super(props);

    this.state = {
      noticeHover: false,
      noticeClick: false
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleHover(visible: boolean){
    this.setState({
      noticeHover: visible
    });
  }

  handleClick(visible: boolean, e: any){
    e.stopPropagation();

    this.setState({
      noticeClick: visible
    });
  }

  render(){
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
