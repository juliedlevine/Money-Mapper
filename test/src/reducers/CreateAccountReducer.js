import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CREATING_USER,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case CREATING_USER:
        return {...state,
            loading: true,
        }

    case LOGIN_USER_SUCCESS:
      return { ...state,
          user: action.payload,
          error: '',
          loading: false,
          email: '',
          password: '' };

    case LOGIN_USER_FAIL:
      return { ...state,
          error: 'Authentication Failed.',
          password: '',
          loading: false };

    default:
      return state;
  }
};
