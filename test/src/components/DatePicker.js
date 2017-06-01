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
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="MM-DD-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            display: 'none',
          },
          dateInput: {
            height: 45,
            borderColor: '#42f4bf',
            borderWidth: 1,
            borderRadius: 7,
        },
            dateText: {
                fontSize: 16,
                fontFamily: 'Avenir'
            },
        }}
        onDateChange={(date) => {
            this.props.updateTransactionDate(date);
            this.setState({
                date: date
            })
        }}
      />
    )
  }
}

export default connect(null, { updateTransactionDate })(MyDatePicker);
