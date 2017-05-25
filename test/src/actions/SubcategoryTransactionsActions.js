import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { DISPLAY_SUB_DETAILS } from './types';

export const displaySubcategoryTransactionDetails = (token, subCategoryName, subCategoryId) => {
    return (dispatch) => {

      const axiosData = {
          token: token,
          timeFrame: "thismonth",
          subcategoryname: subCategoryName,
          subcategoryid: subCategoryId
      };
      const endpoint = "http://localhost:5007/api/subcategorytransactions";
      axios.post(endpoint, axiosData)
          .then(response => {
              // console.log('response for transaction details: ', response.data);
              dispatch({
                  type: DISPLAY_SUB_DETAILS,
                  payload: response.data
              });

              Actions.viewSubcategoryTransactions();
      })
      .catch(err => {
          console.log('error retrieving transaction details: ', err);
      });
    };
};
