import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Login from './components/Login';
import Settings from './components/Settings';
import CreateAccount from './components/CreateAccount';
import AddNewSubcategory from './components/AddNewSubcategory';

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} sceneStyle={styles.routerScene}>

            <Scene key="auth">
                <Scene key="login" component={Login} title="Money Mapper" />
                <Scene key="signup" component={CreateAccount} title="Sign Up" />
            </Scene>

            <Scene key="main">
                <Scene key="settings" component={Settings} title="Settings" />
                <Scene key="addNewSubcategory" component={AddNewSubcategory} title="New Subcategory" />
                {/* <Scene key="signup" component={CreateAccount} title="Sign Up" /> */}
            </Scene>

        </Router>
    );
};

const styles = {
  navBar: {
    fontFamily: 'Avenir',
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
