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
                <View>
                    <Text>{subcategory.subcategory}</Text>
                    <TextInput
                        value={subcategory.monthlyBudget}
                        onChangeText={value => this.amountChanged(value, subcategory.id)}
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        />
                </View>
            )
        })
    }

    renderRow(category) {
        return (
            <View>
                <Card>
                    <CardSection>
                        <Text>{category.category}</Text>
                        <Text>{category.monthlyBudget}</Text>
                    </CardSection>

                {this.subcategories(category.subcategories)}
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
                    renderFooter={()=> (
                        <View>
                            <Button>Done</Button>
                        </View>
                    )}/>

            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        expenses: state.expenses.expenses
    };
};

export default connect(mapStateToProps, { getExpenseData, updateAmount })(Settings);
