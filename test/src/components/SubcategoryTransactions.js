console.disableYellowBox = true;
import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ListView, ScrollView, TouchableHighlight, Modal } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
// import { getExpenseData, updateAmount, updateCategorySelected } from '../actions';
import { Button, CardSection, Card } from './common';


class ViewTransactions extends React.Component {

    renderRow(objTransaction, sectionId, rowId) {
        const transactionDate = objTransaction.date.split('T')[0];
        return (
            <View>
                <Card>
                    <CardSection style={styles.header}>
                        <View style={styles.container}>
                            <Text style={styles.statusText}>{objTransaction.description}</Text>
                            <Text style={styles.statusText}>{transactionDate}</Text>
                            {/* <Text style={styles.statusText}>{objTransaction.address}</Text> */}
                            <Text style={styles.statusText}>{'$' + objTransaction.amount}</Text>
                        </View>
                    </CardSection>
                </Card>
            </View>

        )
    }

    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(this.props.transactionDetails);

        return (
            <View>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderHeader={()=> (
                        <View style={styles.intro}>
                            <Text style={styles.statusText}>Transactions this Month</Text>
                            <Image source={require('./Resources/piggy-bank.png')} style={styles.icon} />

                            <View style={styles.separator}></View>

                        </View>
                    )}
                    renderFooter={()=> (
                        <View>
                            <View style={styles.separator}></View>
                        </View>
                    )}
                  />

            </View>
        )
    }
};

const styles = {
    intro: {
        marginTop: 50,
        alignItems: 'center'
    },
    icon: {
        marginTop: 20,
        marginBottom: 30,
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
    totals: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 25
    },
    totalsText: {
        fontSize: 16,
        fontFamily: 'Avenir',
        alignSelf: 'center',
        paddingLeft: 5,
    },
    amountText: {
        fontSize: 16,
        fontFamily: 'Avenir',
        fontWeight: '600',
        alignSelf: 'center',
        paddingRight: 10,
    },
    lastAmount: {
        paddingBottom: 20,
    },
    inputText: {
        width: 135,
        height: 25,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
        color: 'black',
        textAlign: 'right',
        paddingRight: 10,
        fontFamily: 'Avenir'
    },
    statusText: {
        fontSize: 16,
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
        fontWeight: '600',
        paddingRight: 10,
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
        transactionDetails: state.transactionDetails
    };
};

export default connect(mapStateToProps, {})(ViewTransactions);
