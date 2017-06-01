import deepcopy from 'deepcopy';
import {
    GET_EXPENSES,
    UPDATE_AMOUNT,
    UPDATE_CATEGORY_SELECTED,
    SAVE_SETTINGS,
    UPDATE_TRANSACTION_DATE,
    UPDATE_LOCATION,
    LOADING,
    DONE_LOADING,
} from '../actions/types';

const INITIAL_STATE = {
  expenses: [],
  categorySelected: '',
  transactionDate: '',
  location: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

    case LOADING:
        return { ...state,
            loading: true,
        }

    case DONE_LOADING:
        return { ...state,
            loading: false,
        }

    case UPDATE_TRANSACTION_DATE:
        return { ...state,
            transactionDate: action.payload
        }

    case UPDATE_LOCATION:
        return { ...state,
            location: action.payload
        }

    case GET_EXPENSES:
        return { ...state,
            expenses: action.payload,
            location: ''
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
            expenses: newExpenses,
            location: ''
        }

    case SAVE_SETTINGS:
        return state;

    default:
        return state;
    }
};
