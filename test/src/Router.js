import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Login from './components/Login';
import Settings from './components/Settings';
import CreateAccount from './components/CreateAccount';
import AddNewSubcategory from './components/AddNewSubcategory';
import Home from './components/Home';

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} sceneStyle={styles.routerScene} barButtonIconStyle={{ tintColor: 'white' }}>

            <Scene key="auth">
                <Scene key="login" component={Login} title="Money Mapper" />
                <Scene key="signup" component={CreateAccount} title="Sign Up" />
            </Scene>
            <Scene key="setup">
                <Scene key="settings" component={Settings} title="Settings1" />
                <Scene key="addNewSubcategory" component={AddNewSubcategory} title="New Subcategory" />
            </Scene>
            <Scene key="main">
                <Scene key="home" component={Home} title="Status" rightButtonImage={require("./components/Resources/settings2.png")} onRight={()=>{Actions.settings()}}/>
                <Scene key="settings" component={Settings} title="Budget Configuration" />
                <Scene key="addNewSubcategory" component={AddNewSubcategory} title="New Subcategory" />


                {/* <Scene key="signup" component={CreateAccount} title="Sign Up" /> */}
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
