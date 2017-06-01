import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';
import baseurl from '../url';

// action dispatched when user clicks Done button on Add New Subcategory page
export const addNewSubcategory = (token, categoryName, subcategory, amount) => {

    return (dispatch) => {
        const axiosData = {
            token: token,
            categoryName: categoryName,
            subcategory: subcategory,
            amount: amount
        };

        const endpoint = baseurl + '/api/addnewsubcategory';

        axios.post(endpoint, axiosData)
            .then(response => {
                // After everything is successful re-route the user to the settings page
                Actions.pop();
            })
            .catch(err => {
                console.log('error: ', err);
            });
    };
};
