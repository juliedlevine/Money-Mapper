console.disableYellowBox = true;
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableHighlight, DatePickerIOS, Picker, Item, ScrollView, Keyboard, DeviceEventEmitter } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { addNewTransaction } from '../actions';
import { Button, CardSection, Card, Spinner } from './common';
import MyDatePicker from './DatePicker';
import LocationSearch from './LocationSearch';

class AddNewSubcategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValues: '',
            subcategory: '',
            subcategory_id: '',
            description: '',
            amount: '',
            showPicker: false,
            subcategorySelected: false,
            keyboardOffset: 0,
            message: '',
            buttonDisabled: false
        }
    }

    componentDidMount() {
      _keyboardWillShowSubscription = DeviceEventEmitter.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
      _keyboardWillHideSubscription = DeviceEventEmitter.addListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
    }

    componentWillUnmount() {
      _keyboardWillShowSubscription.remove();
      _keyboardWillHideSubscription.remove();
    }


    _keyboardWillShow(e) {
      this.setState({ keyboardOffset: e.endCoordinates.height });
    }

    _keyboardWillHide(e) {
      this.setState({ keyboardOffset: 0, message: '', buttonDisabled: false });
    }

    updateAmount(text) {
        this.setState({ amount: text, message: '', buttonDisabled: false  })
    }

    updateLocation(text) {
        this.setState({ location: text, message: '', buttonDisabled: false  })
    }

    updateDescription(text) {
        this.setState({ description: text, message: '', buttonDisabled: false  })
    }

    addNewClick() {
        let token = this.props.token;
        let date;
        if (this.props.date === '') {
            let today = new Date;
            date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        } else {
            date = this.props.date;
        }
        let subcategory_id = this.state.subcategory_id;
        let description = this.state.description;
        let location = this.props.location;
        let amount = this.state.amount;
        if (subcategory_id === '' || description === '' || amount === '') {
            this.setState({
                message: 'Please fill out all the required fields.',
                buttonDisabled: true
            })
        } else {
            this.props.addNewTransaction(token, date, subcategory_id, description, location, amount);
        }
    }

    onValueChange(subcategorySomething) {
        let subcategoryName = subcategorySomething.split('::')[0];
        let subcategory_id = subcategorySomething.split('::')[1];
        this.setState({
            message: '',
            buttonDisabled: false,
            pickerValues: subcategorySomething,
            subcategory_id: subcategory_id,
            subcategory: subcategoryName,
        });
    };

    showPicker() {
        this.setState({ showPicker: true });
    }

    hidePicker() {
           let firstCategory = Object.keys(this.props.expenses.expenses[0])[0];
           let firstSubcategory =  Object.keys(this.props.expenses.expenses[0][firstCategory].subcategories[0])[0];
           let subcategory_id = this.props.expenses.expenses[0][firstCategory].subcategories[0][firstSubcategory].id;

           if (this.state.subcategory === '') {
               this.setState({
                   subcategory: firstSubcategory,
                   subcategory_id: subcategory_id,
               })
           }
           this.setState({
               showPicker: false,
               subcategorySelected: true,
           });
       }

    buildPickerList(){
        let itemList = this.props.expenses.expenses.map(category => {
            let categoryName = Object.keys(category)[0];
            let arrSubcategories = category[categoryName].subcategories;
            return arrSubcategories.map(objSubcategory => {
                let subcategoryName = Object.keys(objSubcategory)[0];
                let subcategoryId = objSubcategory[subcategoryName].id;
                    return (<Item label={subcategoryName} value={subcategoryName +'::' + subcategoryId} />);
                })
            })
        return itemList;
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size='large' />;
        }
        return (
            <TouchableHighlight
                disabled={this.state.buttonDisabled}
                style={styles.button}
                onPress={this.addNewClick.bind(this)}
                underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableHighlight>
        );
    }

    render() {
        console.log('loading', this.props.loading);
        return (
            <ScrollView style={{ marginBottom: this.state.keyboardOffset }}>

                <View style={styles.intro}>
                <Image source={require('./Resources/check.png')} style={styles.icon} />
                <Text style={styles.headerText}>Add New Transaction {this.props.categorySelected}</Text>

                    <MyDatePicker />

                    {this.state.showPicker ?
                        <View>
                        <Picker
                          style={{ width: 310 }}
                          selectedValue={this.state.pickerValues}
                          onValueChange={this.onValueChange.bind(this)}>
                          {this.buildPickerList()}
                        </Picker>
                        <TouchableHighlight style={styles.done} onPress={this.hidePicker.bind(this)}>
                            <Text style={styles.doneText}>Select Category</Text>
                        </TouchableHighlight>
                        </View>
                        :

                        this.state.subcategorySelected ?
                        <Text
                            style={styles.subcategorySelected}
                            onPress={this.showPicker.bind(this)}>{this.state.subcategory}</Text> :

                        <Text
                            style={styles.subcategory}
                            onPress={this.showPicker.bind(this)}>Subcategory</Text>

                    }

                    <TextInput
                        style={styles.input}
                        placeholder='Merchant Description'
                        onChangeText={text => this.updateDescription(text)}
                        autoCorrect={false}
                        autoCapitalize={'words'}
                        value={this.state.description} />

                    <View style={styles.locationSearch}>
                        <LocationSearch />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='Amount'
                        onChangeText={text => this.updateAmount(text)}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        keyboardType='numeric'
                        value={this.state.amount} />
                    <Text style={styles.error}>{this.state.message}</Text>

                    {this.renderButton()}


                </View>
            </ScrollView>
        )
    }
}
const styles = {
    locationSearch: {
        fontFamily: 'Avenir',
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#42f4bf',
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        color: '#C7C7CD'
    },
    error: {
        color: 'red',
        fontSize: 17,
        paddingBottom: 10,
    },
    done: {
        height: 45,
        paddingLeft: 12,
        padding: 12,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#42f4bf',
        backgroundColor: '#42f4bf',
        borderRadius: 8,

    },
    doneText: {
        fontSize: 16,
        fontFamily: 'Avenir',
        fontWeight: '600',
        color: '#fff'
    },
    subcategory: {
        fontFamily: 'Avenir',
        height: 45,
        paddingLeft: 12,
        padding: 12,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#42f4bf',
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        color: '#C7C7CD'
    },
    subcategorySelected: {
        fontFamily: 'Avenir',
        height: 45,
        paddingLeft: 12,
        padding: 12,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#42f4bf',
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        color: 'black'
    },
    intro: {
        marginTop: 25,
        alignItems: 'center',
        fontFamily: 'Avenir',
        padding: 30,
        alignItems: 'center',
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
        date: state.expenses.transactionDate,
        expenses: state.expenses,
        location: state.expenses.location,
        loading: state.expenses.loading,
    };
};

export default connect(mapStateToProps, { addNewTransaction })(AddNewSubcategory);
