import deepcopy from 'deepcopy';
import {
    DISPLAY_SUB_DETAILS
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case DISPLAY_SUB_DETAILS:
        return action.payload

    default:
        return state;
    }
};
