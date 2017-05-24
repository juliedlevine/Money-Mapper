console.disableYellowBox = true;
import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ListView, ScrollView } from 'react-native';
import axios from 'axios';
import { getExpenseData, updateAmount } from '../actions';
import { Button, CardSection, Card } from './common';

class Settings extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         amounts: {
    //             1: 0,
    //             2: 0
    //         }
    //     };
    // }

    componentDidMount() {
        this.props.getExpenseData(this.props.user.token);
        console.log()
    }

    amountChanged(value, id) {
        // this.setState({
        //     [id]: value
        // });
        // console.log(this.state);
        this.props.updateAmount(value, id);
    }

    subcategories(subcategories) {
        const refactorSubCategories = Object.keys(subcategories).map(subcategory => {
            return Object.assign({}, subcategories[subcategory], {subcategory: subcategory})
        })
        // console.log(JSON.stringify(this.props.expenses, null, '  '));
        return refactorSubCategories.map(subcategory=> {
            return (
                <View style={styles.container}>
                    <Text style={styles.subcategory}>{subcategory.subcategory}</Text>
                    <TextInput
                        keyboardType='numeric'
                        value={'$' + subcategory.monthlyBudget}
                        onChangeText={value => this.amountChanged(value, subcategory.id)}
                        style={styles.inputText}
                        />
                </View>
            )
        })
    }

    renderRow(category) {
        return (
            <View>
                <Card>
                    <CardSection style={styles.header}>
                        <View style={styles.container}>
                            <Text style={styles.headerText}>{category.category.toUpperCase()}</Text>
                            <Text style={styles.headerText}>${category.monthlyBudget}</Text>
                        </View>
                    </CardSection>

                    {this.subcategories(category.subcategories)}

                    <View style={styles.container}>
                        <Text style={styles.add}>Add Item</Text>
                        <Image source={require('./Resources/plus.png')} style={styles.plusIcon} />
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

export default connect(mapStateToProps, { getExpenseData, updateAmount })(Settings);
