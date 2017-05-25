console.disableYellowBox = true;
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableHighlight, DatePickerIOS, Picker, Item } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { addNewTransaction } from '../actions';
import { Button, CardSection, Card } from './common';
import MyDatePicker from './DatePicker';

class AddNewSubcategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subcategory: '',
            subcategory_id: '',
            description: '',
            location: '',
            amount: '',
            showPicker: false,
        }
    }

    updateAmount(text) {
        this.setState({ amount: text })
    }

    updateLocation(text) {
        this.setState({ location: text })
    }

    updateDescription(text) {
        this.setState({ description: text })
    }

    addNewClick() {
        let token = this.props.token;
        let date = this.props.date;
        let subcategory_id = this.state.subcategory_id;
        let description = this.state.description;
        let location = this.state.location;
        let amount = this.state.amount;
        this.props.addNewTransaction(token, date, subcategory_id, description, location, amount);
    }

    onValueChange(subcategory) {
        this.setState({
            subcategory: subcategory
        });
    };

    showPicker() {
        this.setState({ showPicker: true });
    }

    render() {
        console.log('local state', this.state);
        console.log('overall state date', this.props.date);
        return (
            <View style={styles.intro}>
                <Image source={require('./Resources/piggy-bank.png')} style={styles.icon} />
                <Text style={styles.headerText}>Add New Transaction {this.props.categorySelected}</Text>
                    <MyDatePicker />

                    {this.state.showPicker ?
                        <Picker
                          style={{ width: 200 }}
                          selectedValue={this.state.subcategory}
                          onValueChange={this.onValueChange.bind(this)}>
                          <Item label="Groceries" value="subcategory_id" />
                          <Item label="Restaurants" value="subcategory_id" />
                          <Item label="Test" value="subcategory_id" />
                          <Item label="Test2" value="subcategory_id" />
                          <Item label="Test3" value="subcategory_id" />
                          <Item label="Test4" value="subcategory_id" />
                          <Item label="Test5" value="subcategory_id" />
                          <Item label="Test6" value="subcategory_id" />
                        </Picker> :

                        <View>
                            <Text onPress={this.showPicker.bind(this)}>Subcategory</Text>
                        </View> }

                    <TextInput
                        style={styles.input}
                        placeholder='Merchant Description'
                        onChangeText={text => this.updateDescription(text)}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        value={this.state.description} />
                    <TextInput
                        style={styles.input}
                        placeholder='Location (leave blank if none)'
                        onChangeText={text => this.updateLocation(text)}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        value={this.state.merchant} />
                    <TextInput
                        style={styles.input}
                        placeholder='Amount'
                        onChangeText={text => this.updateAmount(text)}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        keyboardType='numeric'
                        value={this.state.amount} />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.addNewClick.bind(this)}
                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableHighlight>

            </View>
        )
    }
}
const styles = {
    intro: {
        marginTop: 50,
        alignItems: 'center',
        fontFamily: 'Avenir',
        padding: 30,
        alignItems: 'center'
    },
    icon: {
        width: 40,
        height: 40,
    },
    headerText: {
        marginTop: 30,
        marginBottom: 30,
        fontFamily: 'Avenir',
    },
    input: {
        fontFamily: 'Avenir',
        height: 45,
        paddingLeft: 12,
        padding: 4,
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#42f4bf',
        borderRadius: 8,
        color: 'black',
    },
    button: {
        height: 45,
        backgroundColor: '#42f4bf',
        borderColor: '#42f4bf',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.user.token,
        date: state.expenses.transactionDate
    };
};

export default connect(mapStateToProps, { addNewTransaction })(AddNewSubcategory);
