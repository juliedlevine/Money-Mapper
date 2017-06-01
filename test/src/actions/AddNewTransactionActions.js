import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';
import { UPDATE_TRANSACTION_DATE, UPDATE_LOCATION, LOADING, DONE_LOADING } from '../actions/types';
import baseurl from '../url';


// action dispatched when user clicks Done button on Add New Subcategory page
export const addNewTransaction = (token, date, subcategory_id, description, location, amount) => {

    return (dispatch) => {

        // go to settings reducer
        dispatch({ type: LOADING });

        const axiosData = {
            token: token,
            date: date,
            subcategoryid: subcategory_id,
            description: description,
            location: location,
            amount: amount
        };

        const endpoint = baseurl + "/api/addnewtransaction";
        axios.post(endpoint, axiosData)
            .then(response => {
                // After everything is successful re-route the user to the home page
                getExpenseData(dispatch, token);
                dispatch({ type: DONE_LOADING });
                Actions.home({type: ActionConst.RESET});
            })
            .catch(err => {
                dispatch({ type: DONE_LOADING });
                console.log('error: ', err);
            });
    };
};

export const updateTransactionDate = (date) => {
    return {
        type: UPDATE_TRANSACTION_DATE,
        payload: date
    }
}

export const updateLocation = (location) => {
    return {
        type: UPDATE_LOCATION,
        payload: location
    }
}

const getExpenseData = (dispatch, token) => {

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
