import * as React from 'react';
import './form.sass';
import {formValueSelector, InjectedFormProps, reduxForm} from 'redux-form';
import {Form} from 'react-bootstrap';
import {connect} from "react-redux";

let TestForm = (props: any) => {
  // constructor(props: any){
  //   super(props);
  //
  //   this.state = {
  //     salary: 40000,
  //     salaryFormat: '40 000',
  //     type: 'month',
  //     tax: true
  //   };
  //
  //   this.handleChange = this.handleChange.bind(this);
  // }

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

  // setType(type: string){
  //   this.setState({
  //     type: type
  //   });
  // }

  // setTax(){
  //   this.setState({
  //     tax: !this.state.tax
  //   });
  // }

  // handleChange(event: any){
  //   const salary = event.target.value.split(' ').join('');
  //
  //   this.setState({
  //     salary: isNaN(salary) ? 0 : +salary,
  //     salaryFormat: isNaN(salary) ? 0 : this.formatNumber(salary)
  //   });
  // }

  // getSalary(){
  //   return this.state.tax ? this.state.salary : (this.state.salary * 0.87).toFixed();
  // }
  //
  // getSalaryWithTax(){
  //   return this.state.tax ? (this.state.salary / 0.87).toFixed() : this.state.salary;
  // }

  const formatNumber = (number: any) => {
    let arr = number.toString().split('').reverse();
    let res: any[] = [];

    arr.forEach((el: any, i: number) => {
      res.push(el);
      if ((i + 1) % 3 === 0 && arr.length !== (i + 1)) {
        res.push(' ')
      }
    });

    return res.reverse().join('');
  }

  return (
    <Form>
      <div className="text">Сумма</div>

      {/*{*/}
        {/*types.map(type => (*/}
          {/*<div className="radio-container" key={type.value}*/}
               {/*onClick={() => this.setType(type.value)}>*/}
            {/*<div className={'radio ' + (this.state.type === type.value && 'checked')}/>*/}
            {/*<div className="label">*/}
              {/*{type.label}{type.value === 'mrot' && <Notice/>}*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*))*/}
      {/*}*/}

      {/*<div className="tax-container">*/}
        {/*<div className={'tax ' + (!this.state.tax && 'checked')}*/}
             {/*onClick={() => this.setTax()}>*/}
          {/*Указать с НДФЛ*/}
        {/*</div>*/}

        {/*<Form.Check type="switch">*/}
          {/*<Form.Check.Input type="checkbox"*/}
                            {/*checked={this.state.tax}*/}
                            {/*onChange={() => this.setTax()}/>*/}
          {/*<Form.Check.Label/>*/}
        {/*</Form.Check>*/}

        {/*<div className={'tax ' + (this.state.tax && 'checked')}*/}
             {/*onClick={() => this.setTax()}>*/}
          {/*Без НДФЛ*/}
        {/*</div>*/}
      {/*</div>*/}

      {/*<div className="input-container">*/}
        {/*<Form.Control type="text"*/}
                      {/*value={this.state.salaryFormat}*/}
                      {/*onChange={this.handleChange}/> &#8381;*/}
      {/*</div>*/}

      {/*{*/}
        {/*this.state.type === 'month' &&*/}
        {/*<div className="result-container">*/}
          {/*<div className="result">*/}
            {/*<strong>{this.formatNumber(this.getSalary())} &#8381; </strong>*/}
            {/*сотрудник будет получать на руки*/}
          {/*</div>*/}
          {/*<div className="result">*/}
            {/*<strong>{this.formatNumber(this.getSalaryWithTax() - this.getSalary())} &#8381; </strong>*/}
            {/*НДФЛ, 13% от оклада*/}
          {/*</div>*/}
          {/*<div className="result">*/}
            {/*<strong>{this.formatNumber(this.getSalaryWithTax())} &#8381; </strong>*/}
            {/*за сотрудника в месяц*/}
          {/*</div>*/}
        {/*</div>*/}
      {/*}*/}
    </Form>
  );
}


TestForm = reduxForm({
  form: 'test-form'
})(TestForm)

const selector = formValueSelector('test-form')

TestForm = connect(
  state => {
    // can select values individually
    const hasEmailValue = selector(state, 'hasEmail')
    const favoriteColorValue = selector(state, 'favoriteColor')
    // or together as a group
    const {firstName, lastName} = selector(state, 'firstName', 'lastName')
    return {
      hasEmailValue,
      favoriteColorValue,
      fullName: `${firstName || ''} ${lastName || ''}`
    }
  }
)(TestForm)

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
