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
        console.log('Axios data', axiosData);
        axios.post(endpoint, axiosData)
            .then(response => {
                // After everything is successful re-route the user to the settings page
                console.log("sending to home page");
                Actions.home();
            })
            .catch(err => {
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
