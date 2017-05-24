import { Actions } from 'react-native-router-flux';
import axios from 'axios';

// action dispatched when user clicks Done button on Add New Subcategory page
export const addNewSubcategory = (token, categoryName, subcategory, amount) => {

    return (dispatch) => {
        const axiosData = {
            token: token,
            categoryName: categoryName,
            subcategory: subcategory,
            amount: amount
        };

        const endpoint = "http://localhost:5007/api/addnewsubcategory";

        axios.post(endpoint, axiosData)
            .then(response => {
                // After everything is successful re-route the user to the settings page
                Actions.settings();
            })
            .catch(err => {
                console.log('error: ', err);
            });
    };
};
