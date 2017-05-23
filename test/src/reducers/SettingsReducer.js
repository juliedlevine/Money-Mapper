import {
    GET_EXPENSES,
    UPDATE_AMOUNT
} from '../actions/types';

const INITIAL_STATE = {
  expenses: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

    case GET_EXPENSES:
        return { ...state,
            expenses: action.payload
        }

    case UPDATE_AMOUNT:
        let id = action.payload.id;
        let value = action.payload.value;
        console.log('Action Payload in Settings Reducer', action.payload);
        console.log('State.expenses', state.expenses);
        state.expenses.map(expense => {
            Object.assign({}, expense, {
                subcategories: rebuild
            })
        })
        return state;

    default:
        return state;
    }
};
