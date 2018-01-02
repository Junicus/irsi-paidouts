import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
  outerBox: {
    display: 'flex',
  },
  fieldGroup: {
    marginRight: 5
  }
}

class DateRangeSelector extends Component {
  state = {
    left: this.props.leftValue,
    right: this.props.rightValue,
  }

  static propType = {
    leftLabel: PropTypes.string,
    leftValue: PropTypes.string,
    rightLabel: PropTypes.string,
    rightValue: PropTypes.string,
    onChange: PropTypes.func
  }

  onChangeLocal = (e) => {
    const { onChange = (e, data) => void (0) } = this.props;
    e.preventDefault();
    const newState = {
      ...this.state,
      [e.target.name]: e.target.value
    }
    this.setState(newState);
    onChange(e, newState);
  }

  render() {
    const { leftLabel, rightLabel } = this.props;
    return (
      <div className='ui form' style={styles.outerBox}>
        <div className='inline field' style={styles.fieldGroup}>
          <label>{leftLabel ? leftLabel : 'Start Date:'}</label>
          <div className="ui input">
            <input type='date' name='left'
              value={this.state.left} onChange={this.onChangeLocal} />
          </div>
        </div>
        <div className='inline field' style={styles.fieldGroup}>
          <label>{rightLabel ? rightLabel : 'End Date:'}</label>
          <div className="ui input">
            <input type='date' name='right'
              value={this.state.right} onChange={this.onChangeLocal} />
          </div>
        </div>
      </div>
    );
  }
}

export default DateRangeSelector;