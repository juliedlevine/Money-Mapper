import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer';
import LoginReducer from './LoginReducer';
import SubcategoryTransactionsReducer from './SubcategoryTransactionsReducer';
import createAccountReducer from './CreateAccountReducer';

export default combineReducers({
  createAccount: createAccountReducer,
  auth: LoginReducer,
  expenses: SettingsReducer,
  transactionDetails: SubcategoryTransactionsReducer
});
