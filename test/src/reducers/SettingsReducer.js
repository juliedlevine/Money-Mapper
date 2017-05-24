import deepcopy from 'deepcopy';
import {
    GET_EXPENSES,
    UPDATE_AMOUNT
} from '../actions/types';

const INITIAL_STATE = {
  expenses: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

    case GET_EXPENSES:
        return { ...state,
            expenses: action.payload
        }

    case UPDATE_AMOUNT:
        let mainCategory = action.payload.mainCategory;
        let rowId = action.payload.rowId;
        let idx = action.payload.idx;
        let value = action.payload.value;
        let subCategoryName = action.payload.subCategoryName;

        let newExpenses = deepcopy(state.expenses);
        console.log('new expenses', newExpenses)
        newExpenses[rowId][mainCategory].subcategories[idx][subCategoryName].monthlyBudget = value;
        console.log('modified new expenses', newExpenses);
        return {
            expenses: newExpenses
        }

    default:
        return state;
    }
};
