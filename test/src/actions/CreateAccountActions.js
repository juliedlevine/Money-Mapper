import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CREATING_USER
 } from './types';


export const createUserAccount = (first, last, email, password) => {
      return (dispatch) => {
          // use this for creating a spinner
      dispatch({ type: CREATING_USER });

      const axiosData = {
          email: email,
          firstName: first,
          lastName: last,
          password: password
      };

      const endpoint = "http://localhost:5007/api/user/signup";

      axios.post(endpoint, axiosData)
      .then(response => {
        const token = response.data
        console.log('token returned: ', token );
        let user = { email: email, firstName: first, lastName: last, token: token};
        loginUserSuccess(dispatch, user);
      })
      .catch(err => {
        console.log('error: ', err);
        loginUserFail(dispatch);
      });

    };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
  Actions.signup();
  console.log('signup failed');
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};
