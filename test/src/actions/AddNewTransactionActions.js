import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { UPDATE_TRANSACTION_DATE } from '../actions/types';


// action dispatched when user clicks Done button on Add New Subcategory page
export const addNewTransaction = (token, date, subcategory_id, description, location, amount) => {

    return (dispatch) => {
        const axiosData = {
            token: token,
            date: date,
            subcategoryid: subcategory_id,
            description: description,
            location: location,
            amount: amount
        };

        const endpoint = "http://localhost:5007/api/addnewtransaction";

        axios.post(endpoint, axiosData)
            .then(response => {
                // After everything is successful re-route the user to the settings page
                Actions.main();
            })
            .catch(err => {
                console.log('error: ', err);
            });
    };
};

export const updateTransactionDate = (date) => {
    console.log('Date in new Transaction actions file', date);
    return {
        type: UPDATE_TRANSACTION_DATE,
        payload: date
    }
}
