console.disableYellowBox = true;
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { addNewSubcategory } from '../actions';
import { Button, CardSection, Card } from './common';

class AddNewSubcategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            amount: '',
        }
    }

    updateName(text) {
        this.setState({ name: text})
    }

    updateAmount(text) {
        this.setState({ amount: text })
    }

    addNewClick() {
        let token = this.props.token;
        let categoryName = this.props.categorySelected;

        let subcategory = this.state.name;
        let amount = this.state.amount;
        this.props.addNewSubcategory(token, categoryName, subcategory, amount);
    }

    render() {
        return (
            <View style={styles.intro}>
                <Image source={require('./Resources/piggy-bank.png')} style={styles.icon} />
                <Text style={styles.headerText}>Add New Subcategory to {this.props.categorySelected}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Subcategory Name'
                        onChangeText={text => this.updateName(text)}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        value={this.state.name} />
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
        categorySelected: state.expenses.categorySelected
    };
};

export default connect(mapStateToProps, { addNewSubcategory })(AddNewSubcategory);
