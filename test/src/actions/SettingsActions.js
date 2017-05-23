import axios from 'axios';
import { GET_EXPENSES, UPDATE_AMOUNT } from './types';
import ramda from 'ramda';

export const getExpenseData = (token) => {
    return (dispatch) => {

        const axiosData = {
            token: token,
            timeFrame: "thismonth"
        };
        const endpoint = "http://localhost:5007/api/expenses";
        axios.post(endpoint, axiosData)
            .then(response => {
                const expenses = response.data;
                const refactorExpenses = Object.keys(expenses).map(category => {
                    return Object.assign({}, expenses[category], {category: category})
                })
                dispatch({
                    type: GET_EXPENSES,
                    payload: refactorExpenses
                });
        })
        .catch(err => {
            console.log('error retrieving expenses: ', err);
        });
    };
};

export const updateAmount = (value, id) => {
    return {
        type: UPDATE_AMOUNT,
        payload: {
            value: value,
            id: id
        }
    }
}
