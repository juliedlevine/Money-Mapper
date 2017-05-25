import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer';
import LoginReducer from './LoginReducer'
import SubcategoryTransactionsReducer from './SubcategoryTransactionsReducer'

export default combineReducers({
  auth: LoginReducer,
  expenses: SettingsReducer,
  transactionDetails: SubcategoryTransactionsReducer
});
