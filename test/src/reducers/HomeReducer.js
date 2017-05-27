import deepcopy from 'deepcopy';
import {
    GET_EXPENSES,
    UPDATE_AMOUNT,
    UPDATE_CATEGORY_SELECTED,
} from '../actions/types';

const INITIAL_STATE = {
  expenses: [],
  categorySelected: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

    case GET_EXPENSES:
        return { ...state,
            expenses: action.payload
        }

    case UPDATE_CATEGORY_SELECTED:
        return { ...state,
            categorySelected: action.payload
        }

    case UPDATE_AMOUNT:
        let mainCategory = action.payload.mainCategory;
        let rowId = action.payload.rowId;
        let idx = action.payload.idx;
        let value = action.payload.value;
        let subCategoryName = action.payload.subCategoryName;

        let newExpenses = deepcopy(state.expenses);

        newExpenses[rowId][mainCategory].subcategories[idx][subCategoryName].monthlyBudget = value;
        const subcategories = newExpenses[rowId][mainCategory].subcategories;
        const newMonthlyBudget = subcategories.reduce((accum, subcat) => {
          return accum + Number(subcat[Object.keys(subcat)[0]].monthlyBudget);
        },0);
        newExpenses[rowId][mainCategory].monthlyBudget = Number(newMonthlyBudget);

        return { ...state,
            expenses: newExpenses
        }

    default:
        return state;
    }
};
