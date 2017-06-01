import React, { Component } from 'react';
import { AppRegistry, Text, View, Button, Image, TouchableHighlight, TextInput, ScrollView, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createUserAccount } from '../actions';
import { Spinner } from './common';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            last: '',
            email: '',
            password: '',
            confirm: '',
            error: '',
            keyboardOffset: 0
        };
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
      this.setState({ keyboardOffset: 0 });
    }

    first(event) {
        this.setState({ first: event.nativeEvent.text });
    }
    last(event) {
        this.setState({ last: event.nativeEvent.text });
    }
    email(event) {
        this.setState({ email: event.nativeEvent.text });
    }
    password(text) {
        this.setState({ password: text });
        if (text !== this.state.confirm){
          this.setState({ error: 'Passwords much match'});
        } else {
          this.setState({ error: '' });
        }
    }
    confirm(text) {
        this.setState({ confirm: text });
        if (this.state.password !== text){
          this.setState({ error: 'Passwords much match'});
        } else {
          this.setState({ error: '' });
        }
    }

    signUp() {
        let email = this.state.email;
        let password = this.state.password;
        let first = this.state.first;
        let last = this.state.last;
        if (this.state.password === this.state.confirm){
          console.log('starting signup');
          this.props.createUserAccount(first, last, email, password)
        }

    }

    render() {
        return (
            <ScrollView style={{ flex: 1, marginBottom: this.state.keyboardOffset }}>
            <View style={styles.container}>
                <Image source={require('./Resources/id-card.png')} style={styles.icon} />
                <Text style={styles.container}>Welcome! Please Fill out all fields.</Text>
                <TextInput
                    autoCapitalize={'words'}
                    style={styles.searchInput}
                    placeholder='First Name'
                    onChange={this.first.bind(this)}
                    autoCorrect={false}
                    value={this.state.first} />
                <TextInput
                autoCapitalize={'words'}
                    style={styles.searchInput}
                    placeholder='Last Name'
                    autoCorrect={false}
                    onChange={this.last.bind(this)}
                    value={this.state.last} />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Email'
                    keyboardTyle='email-address'
                    autoCorrect={false}
                    onChange={this.email.bind(this)}
                    value={this.state.email} />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Password'
                    autoCorrect={false}
                    onChangeText={text => this.password(text)}
                    secureTextEntry={true}
                    value={this.state.password} />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Confirm password'
                    autoCorrect={false}
                    onChangeText={text => this.confirm(text)}
                    secureTextEntry={true}
                    value={this.state.confirm} />
                <Text>
                  {this.state.error}
                </Text>
                <TouchableHighlight style={styles.button} onPress={() => this.signUp()} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableHighlight>

          </View>
          </ScrollView>
        );
    }
}

const styles = {
    container: {
        padding: 30,
        marginTop: 30,
        alignItems: 'center'
    },
    description: {
        fontFamily: 'Avenir',
        marginBottom: 20,
        fontSize: 15,
        textAlign: 'center',
        color: '#656565'
    },
    icon: {
        width: 40,
        height: 40,
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
        fontSize: 15,
        color: 'white',
        alignSelf: 'center'
    },
    searchInput: {
        paddingLeft: 8,
        height: 45,
        padding: 4,
        marginBottom: 10,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#42f4bf',
        borderRadius: 8,
        color: 'black',
        fontFamily: 'Avenir',
    },
    separator: {
        height: 40,
    },
    account: {
        marginTop: 50,
        marginBottom: 10,
    }
};

// const mapStateToProps = (state) => {
//   return { signUpEmail: state.auth.signUpEmail, signUpPassword: state.auth.signUpPassword, signUpError: state.auth.signUpError, signUpLoading: state.auth.signUpLoading };
// };
//
export default connect(null, { createUserAccount })(Signup);

// export default Signup;
