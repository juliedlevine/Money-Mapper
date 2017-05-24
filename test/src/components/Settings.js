console.disableYellowBox = true;
import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ListView, ScrollView, TouchableHighlight, Modal } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { getExpenseData, updateAmount, updateCategorySelected } from '../actions';
import { Button, CardSection, Card } from './common';


class Settings extends React.Component {

    componentDidMount() {
        this.props.getExpenseData(this.props.user.token);
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
                <View style={styles.container}>
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

                    <View style={styles.container}>
                        <Text style={styles.add}>Add Item</Text>
                        <TouchableHighlight onPress={()=> this.addNew(mainCategory)}>
                            <Image source={require('./Resources/plus.png')} style={styles.plusIcon} />
                        </TouchableHighlight>
                    </View>

                </Card>
            </View>

        )
    }

    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(this.props.expenses);
        if (this.props.expenses.length > 0) {
            console.log('monthlyBudget:', this.props.expenses[0].Food.subcategories[0].monthlyBudget);
        }
        return (
            <View>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderHeader={()=> (
                        <View style={styles.intro}>
                            <Image source={require('./Resources/piggy-bank.png')} style={styles.icon} />
                            <Text style={styles.settingsText}>{this.props.user.firstName}s Budget Total:</Text>
                            <Text style={styles.total}>$1800</Text>
                        </View>
                    )}
                    renderFooter={()=> (
                        <View>
                            <View style={styles.separator}></View>
                            <Button>Done</Button>
                            <View style={styles.separator}></View>
                        </View>
                    )}/>

            </View>
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
        marginRight: 10,
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
        height: 36,
        marginBottom: 10,
        fontSize: 15,
        color: 'black',
        textAlign: 'right',
        paddingRight: 5,
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
        fontWeight: '600'
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

export default connect(mapStateToProps, { getExpenseData, updateAmount, updateCategorySelected })(Settings);
