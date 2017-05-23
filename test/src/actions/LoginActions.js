import { Actions } from 'react-native-router-flux';
import axios from 'axios';
//
import {
  LOGIN_FORM_UPDATE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
 } from './types';

// update form as user types in email and password fields
export const loginFormUpdate = ({ prop, value }) => {
  return {
    type: LOGIN_FORM_UPDATE,
    payload: { prop, value }
  };
};

// action dispatched when user clicks login button
export const loginUser = (email, password) => {
      return (dispatch) => {
      dispatch({ type: LOGIN_USER });

      const axiosData = {
          email: email,
          password: password
      };

      const endpoint = "http://localhost:5007/api/user/login";

      axios.post(endpoint, axiosData)
      .then(response => {
        const user = response.data
        // console.log('user response: ', user );
        loginUserSuccess(dispatch, user);
      })
      .catch(err => {
        console.log('error: ', err);
        loginUserFail(dispatch);
      });

    };
};

// helper function for when login fails
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

// helper function for when login succeeds
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  // After everything is successful re-route the user to the main page
  Actions.main();
};
