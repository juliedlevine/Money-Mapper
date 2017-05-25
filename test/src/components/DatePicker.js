import React from 'react';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { updateTransactionDate } from '../actions';

class MyDatePicker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        date: new Date()
    }
  }

  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {
            this.props.updateTransactionDate(date);
            console.log('Date in datePicker component', date);
            this.setState({
                date: date
            })
        }}
      />
    )
  }
}

export default connect(null, { updateTransactionDate })(MyDatePicker);
