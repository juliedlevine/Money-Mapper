import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { loginFormUpdate, loginUser } from '../actions';
import { Spinner } from './common';

class Login extends Component {

    signIn() {
        this.props.loginUser(this.props.email, this.props.password);
    }

    renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
          <Text style={styles.buttonText} onPress={() => this.signIn()}>Sign In</Text>
      </TouchableHighlight>
    );
  }

    render() {

        return (
            <View style={styles.container}>
                <Image source={require('./Resources/home.png')} style={styles.icon} />
                <Text style={styles.container}>Welcome!</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Email'
                    onChangeText={value => this.props.loginFormUpdate({ prop: 'email', value: value })}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    value={this.props.email} />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Password'
                    onChangeText={value => this.props.loginFormUpdate({ prop: 'password', value: value })}
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    value={this.props.password} />
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>

                {this.renderButton()}

                <View style={styles.separator}></View>
                <Text style={styles.text}>New to MoneyMapper? Great!</Text>
                <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText} onPress={() => Actions.signup()}>Sign Up</Text>
                </TouchableHighlight>
          </View>
        );
    }
}
const styles = {
    text: {
        fontFamily: 'Avenir',
    },
    container: {
        fontFamily: 'Avenir',
        padding: 30,
        marginTop: 30,
        alignItems: 'center'
    },
    description: {
        fontFamily: 'Avenir',
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    icon: {
        width: 40,
        height: 40,
    },
    button: {
        height: 36,
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
    searchInput: {
        fontFamily: 'Avenir',
        height: 36,
        paddingLeft: 12,
        padding: 4,
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#42f4bf',
        borderRadius: 8,
        color: 'black'
    },
    separator: {
        height: 40,
    },
    account: {
        marginTop: 50,
        marginBottom: 10,
    },
    errorTextStyle: {
        fontFamily: 'Avenir',
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
  }
};

const mapStateToProps = (state) => {
  return {
      email: state.auth.email,
      password: state.auth.password,
      error: state.auth.error,
      loading: state.auth.loading
  };
};

export default connect(mapStateToProps, { loginFormUpdate, loginUser })(Login);
