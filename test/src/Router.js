import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Login from './components/Login';
import Settings from './components/Settings';
import CreateAccount from './components/CreateAccount';
import AddNewSubcategory from './components/AddNewSubcategory';
import SubcategoryTransactions from './components/SubcategoryTransactions';
import Home from './components/Home';
import AddNewTransaction from './components/AddNewTransaction';

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} sceneStyle={styles.routerScene} barButtonIconStyle={{ tintColor: 'white' }}>
          <Scene key="root">
            <Scene key="auth">
                <Scene key="login" component={Login} title="Money Mapper" />
                <Scene key="signup" component={CreateAccount} title="Sign Up" />
            </Scene>

            <Scene key="main">

                <Scene key="home"
                    component={Home}
                    title="Spending Summary"
                    leftButtonImage={require("./components/Resources/add.png")} onLeft={()=>{Actions.addNewTransaction()}}
                    rightButtonImage={require("./components/Resources/settings2.png")} onRight={()=>{Actions.budgetConfig()}}
                />
                <Scene key="budgetConfig" component={Settings} title="Budget Configuration" />
                <Scene key="addNewSubcategory" component={AddNewSubcategory} title="New Subcategory" />
                <Scene key="viewSubcategoryTransactions" component={SubcategoryTransactions} title="Purchases" />
            </Scene>

          </Scene>
        </Router>
    );
};

const styles = {
  navBar: {
    // fontFamily: 'Avenir',
    backgroundColor: '#42f4bf',
    borderBottomColor: 'transparent'
  },
  navTitle: {
    fontFamily: 'Avenir',
    color: 'white', // changing navbar title color
  },
  routerScene: {
      borderColor: '#42f4bf',
    paddingTop: 65, // some navbar padding to avoid content overlap
  },
}

export default RouterComponent;
