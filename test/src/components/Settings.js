console.disableYellowBox = true;
import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ListView, ScrollView, TouchableHighlight, Modal, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { getExpenseData, updateAmount, updateCategorySelected, saveExpenseData } from '../actions';
import { Button, CardSection, Card } from './common';


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyboardOffset: 0,
        }
    }

    componentDidMount() {
        this.props.getExpenseData(this.props.user.token);
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

    amountChanged(value, mainCategory, rowId, idx, subCategoryName) {
        let newValue = value.substring(1);
        this.props.updateAmount(newValue, mainCategory, rowId, idx, subCategoryName);
    }

    subcategories(subcategories, mainCategory, rowId) {
        let subCategoryRows = subcategories.map((subcategory, idx) => {
            let subCategoryName = Object.keys(subcategory)[0];
            let monthlyBudget = this.props.expenses[rowId][mainCategory].subcategories[idx][subCategoryName].monthlyBudget;
            return (
                <View
                      style={styles.container}>
                    <Text style={styles.subcategory}>{subCategoryName}</Text>
                    <TextInput
                        keyboardType='numeric'
                        value={'$' + monthlyBudget}
                        onChangeText={value => this.amountChanged(value, mainCategory, rowId, idx, subCategoryName)}
                        style={styles.inputText}
                        />
                </View>
            )
        })
        return (subCategoryRows);

    }

    addNew(mainCategory) {
        this.props.updateCategorySelected(mainCategory);
        Actions.addNewSubcategory();
        this.props.saveExpenseData(this.props.user.token, this.props.expenses, 'save');
    }

    saveChanges(){
      this.props.saveExpenseData(this.props.user.token, this.props.expenses, 'done');
    }

    renderRow(category, sectionId, rowId) {
        let mainCategory = Object.keys(category)[0];
        let mainCategoryBudget = this.props.expenses[rowId][mainCategory].monthlyBudget;
        let subcategories = this.props.expenses[rowId][mainCategory].subcategories;
        return (
            <View>
                <Card>
                    <CardSection style={styles.header}>
                        <View style={styles.container}>
                            <Text style={styles.headerText}>{mainCategory.toUpperCase()}</Text>
                            <Text style={styles.headerText}>${mainCategoryBudget}</Text>
                        </View>
                    </CardSection>

                    {this.subcategories(subcategories, mainCategory, rowId)}

                    <TouchableOpacity style={styles.container} onPress={()=> this.addNew(mainCategory)}>
                        <Text style={styles.add}>Add Subcategory</Text>
                        <Image source={require('./Resources/plus.png')} style={styles.plusIcon} />
                    </TouchableOpacity>

                </Card>
            </View>

        )
    }

    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(this.props.expenses);
        const totalMonthlyBudget = this.props.expenses.reduce((accum, category) =>{
          return accum + category[Object.keys(category)[0]].subcategories.reduce((accum, subcategory) => {
            return accum + Number(subcategory[Object.keys(subcategory)[0]].monthlyBudget);
          },0);
        },0);

        return (
            <ScrollView style={{ marginBottom: this.state.keyboardOffset }}>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderHeader={()=> (
                        <View style={styles.intro}>
                            <Image source={require('./Resources/settings.png')} style={styles.icon} />
                            <Text style={styles.settingsText}>Your Budget Total:</Text>
                            <Text style={styles.total}>${totalMonthlyBudget.toFixed(2)}</Text>
                        </View>
                    )}
                    renderFooter={()=> (
                        <View>
                            <View style={styles.separator}></View>
                            <Button onPress={() => this.saveChanges()} >Done</Button>
                            <View style={styles.separator}></View>
                        </View>
                    )}/>

            </ScrollView>
        )
    }
};

const styles = {
    total: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 7,
        marginBottom: 30,
    },
    intro: {
        marginTop: 50,
        alignItems: 'center'
    },
    icon: {
        width: 40,
        height: 40,
    },
    plusIcon: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        marginRight: 7,
        marginTop: 7,
    },
    separator: {
        height: 20
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputText: {
        width: 85,
        height: 25,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 15,
        color: 'black',
        textAlign: 'right',
        paddingRight: 10,
        fontFamily: 'Avenir',
    },
    header: {
        backgroundColor: '#42f4bf',
        height: 40,
    },
    headerText: {
        fontFamily: 'Avenir',
        color: 'white',
        alignSelf: 'center',
        fontSize: 17,
        fontWeight: '800',
        paddingRight: 6,
    },
    settingsText: {
        marginTop: 30,
        fontFamily: 'Avenir',
    },
    subcategory: {
        fontFamily: 'Avenir',
        paddingLeft: 10,
        fontSize: 15,
        alignSelf: 'center'
    },
    add: {
        fontFamily: 'Avenir',
        padding: 10,
        fontSize: 11,
        alignSelf: 'center',
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        expenses: state.expenses.expenses
    };
};

export default connect(mapStateToProps, { getExpenseData, updateAmount, updateCategorySelected, saveExpenseData })(Settings);
