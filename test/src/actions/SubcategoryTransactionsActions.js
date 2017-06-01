import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { DISPLAY_SUB_DETAILS } from './types';
import baseurl from '../url';

export const displaySubcategoryTransactionDetails = (token, subCategoryName, subCategoryId) => {
    return (dispatch) => {

      const axiosData = {
          token: token,
          timeFrame: "thismonth",
          subcategoryname: subCategoryName,
          subcategoryid: subCategoryId
      };
      const endpoint = baseurl + "/api/subcategorytransactions";
      axios.post(endpoint, axiosData)
          .then(response => {
              dispatch({
                  type: DISPLAY_SUB_DETAILS,
                  payload: {
                      data: response.data,
                      name: subCategoryName
                  }
              });

              Actions.viewSubcategoryTransactions();
      })
      .catch(err => {
          console.log('error retrieving transaction details: ', err);
      });
    };
};
