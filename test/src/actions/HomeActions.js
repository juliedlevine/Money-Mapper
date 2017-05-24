import axios from 'axios';
import { GET_EXPENSES, UPDATE_AMOUNT, UPDATE_CATEGORY_SELECTED } from './types';

export const updateCategorySelected = (mainCategory) => {
    return {
        type: UPDATE_CATEGORY_SELECTED,
        payload: mainCategory
    }
}

export const getExpenseData = (token) => {
    return (dispatch) => {

        const axiosData = {
            token: token,
            timeFrame: "thismonth"
        };
        const endpoint = "http://localhost:5007/api/expenses2";
        axios.post(endpoint, axiosData)
            .then(response => {
                // console.log(JSON.stringify(response.data, null, '  '));
                // const expenses = response.data;
                // // const refactorExpenses = Object.keys(expenses).map(category => {
                // //     return Object.assign({}, expenses[category], {category: category})
                // })
                dispatch({
                    type: GET_EXPENSES,
                    payload: response.data
                });
        })
        .catch(err => {
            console.log('error retrieving expenses: ', err);
        });
    };
};

export const updateAmount = (value, mainCategory, rowId, idx, subCategoryName) => {
    return {
        type: UPDATE_AMOUNT,
        payload: {
            value: value,
            mainCategory: mainCategory,
            rowId: rowId,
            idx: idx,
            subCategoryName: subCategoryName
        }
    }
}
