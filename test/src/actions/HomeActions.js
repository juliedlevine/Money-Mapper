import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';
import { GET_EXPENSES, UPDATE_AMOUNT, UPDATE_CATEGORY_SELECTED, DISPLAY_SUB_DETAILS, LOGOUT, SAVE_SETTINGS } from './types';
import baseurl from '../url';

export const updateCategorySelected = (mainCategory) => {
    return {
        type: UPDATE_CATEGORY_SELECTED,
        payload: mainCategory
    }
}

export const saveExpenseData = (token, expenses, finishAction) => {
    return (dispatch) => {

        const axiosData = {
            token: token,
            expenses: expenses
        };
        const endpoint = baseurl + "/api/saveexpenses";
        axios.post(endpoint, axiosData)
            .then(response => {
                dispatch({
                    type: SAVE_SETTINGS,
                    payload: response.data
                });
            if (finishAction === 'done') {
                saveExpenseDataComplete();
            }
        })
        .catch(err => {
            console.log('error retrieving expenses: ', err);
        });
    };
};

const saveExpenseDataComplete= () => {
  Actions.home({type: ActionConst.RESET});
};

export const getExpenseData = (token) => {
    return (dispatch) => {

        const axiosData = {
            token: token,
            timeFrame: "thismonth"
        };
        const endpoint = baseurl + "/api/expenses2";
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

// this isnt working. Supposed to get sent over to Login reducer to set state back to inital state
export const logout = () => {
    Actions.auth();
    return {
        type: LOGOUT
    }
}
