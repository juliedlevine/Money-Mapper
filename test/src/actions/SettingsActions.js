import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { GET_EXPENSES, UPDATE_AMOUNT, UPDATE_CATEGORY_SELECTED, SAVE_SETTINGS } from './types';

export const saveExpenseData = (token, expenses) => {
    console.log("entering saveExpenseData");
    return (dispatch) => {

        const axiosData = {
            token: token,
            expenses: expenses
        };
        const endpoint = "http://localhost:5007/api/saveexpenses";
        axios.post(endpoint, axiosData)
            .then(response => {
                dispatch({
                    type: SAVE_SETTINGS,
                    payload: response.data
                });
            console.log("am i getting here?");
            saveExpenseDataComplete();
        })
        .catch(err => {
            console.log('error retrieving expenses: ', err);
        });
    };
};

const saveExpenseDataComplete= () => {
  console.log('what about here?');
  Actions.home();
};

export const updateCategorySelected = (mainCategory) => {
    return {
        type: UPDATE_CATEGORY_SELECTED,
        payload: mainCategory
    }
}

export const getExpenseData = (token) => {
    // console.log('token: ', token);
    return (dispatch) => {

        const axiosData = {
            token: token,
            timeFrame: "thismonth"
        };
        const endpoint = "http://localhost:5007/api/expenses2";
        axios.post(endpoint, axiosData)
            .then(response => {
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
