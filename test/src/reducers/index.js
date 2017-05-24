import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer';
import LoginReducer from './LoginReducer'


export default combineReducers({
  auth: LoginReducer,
  expenses: SettingsReducer
});

// export default combineReducers({
//   auth: HomeReducer,
//   employeeForm: EmployeeFormReducer
// });
