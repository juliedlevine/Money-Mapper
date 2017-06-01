import {
    DISPLAY_SUB_DETAILS
} from '../actions/types';

const INITIAL_STATE = {
    details: [],
    name: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case DISPLAY_SUB_DETAILS:
          return { ...state,
              details: action.payload.data,
              name: action.payload.name
          }

    default:
        return state;
    }
};
