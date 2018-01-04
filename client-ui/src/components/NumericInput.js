import React, { Component } from 'react'

function validationClasses(props, value, error) {
  let classNames = props.className ? [props.className] : [];
  if (error) {
    classNames.push(props.invalidClass || 'invalid');
    if (value === '') {
      classNames.push(props.requiredClass || 'required');
    }
  }
  return classNames.join(' ');
}

export class NumericInput extends Component {
  constructor() {
    super(...arguments);

    this.onKeyPress = e => {
      const { charCode } = e;
      const { integer, positive } = this.props;
      const allowed = (positive ? [] : [45]).concat(integer ? [] : [46]);

      if (e.ctrlKey) return;
      if (charCode && (charCode < 48 || charCode > 57) && allowed.indexOf(charCode) < 0) {
        e.preventDefault();
      }
    }

    this.onChange = e => {
      const { value } = e.target;
      this.setState(value);
      const asNumber = Number(value);
      if (value && !isNaN(asNumber)) {
        this.props.valueLink.update(x => {
          if (asNumber !== Number(x)) {
            return asNumber;
          }
        });
      }
    }
  }

  componentWillMount() {
    this.setAndConvert(this.props.valueLink.value);
  }

  setValue(x) {
    this.value = String(x);
    this.error = this.value === '' || isNaN(Number(x));
    this.forceUpdate();
  }

  setAndConvert(x) {
    let value = Number(x);
    if (this.props.positive) {
      value = Math.abs(value);
    }
    if (this.props.integer) {
      value = Math.round(value);
    }
    this.setValue(value);
  }

  componentWillReceiveProps(nextProps) {
    const { valueLink: next } = nextProps;
    if (Number(next.value) !== Number(this.value)) {
      this.setAndConvert(next.value);
    }
  }

  render() {
    const { valueLink, positive, integer, ...props } = this.props;
    const error = valueLink.error || this.error;
    reutrn(<input {...props} type='text' className={validationClasses(props, this.value, error)}
      value={this.value} onKeyPress={this.onKeyPress} onChange={this.onChange} />);
  }
}