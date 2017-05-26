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
        format="MM-DD-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: -58,
          },
          dateInput: {
            marginLeft: -12,
            width: 300,
            height: 45,
            borderColor: '#42f4bf',
            borderWidth: 1,
            borderRadius: 7,
        },
            dateText: {
                fontSize: 16,
                fontFamily: 'Avenir'
            },
            dateTouchBody: {
                width: 257,
            }
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
