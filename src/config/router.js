import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Feather';

import ListChat from '../screens/ListChat';
import ChatDetail from '../screens/ChatDetail';
import ProfileFriend from '../screens/ProfileFriend';

import Contact from '../screens/Contact';
import AddFriend from '../screens/AddFriend';

import Profile from '../screens/Profile';

import Login from '../screens/Login';
import Register from '../screens/Register';

import SplashScreen from '../screens/SplashScreen';

const SplashScreenNav = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

const AuthNav = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const ChatNav = createStackNavigator(
  {
    Chat: {
      screen: ListChat,
      navigationOptions: {
        headerShown: false,
      },
    },
    ChatDetail: {
      screen: ChatDetail,
      navigationOptions: {
        headerShown: false,
      },
    },
    ProfileFriend: {
      screen: ProfileFriend,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Chat',
  },
);

ChatNav.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const ContactNav = createStackNavigator(
  {
    Contact: {
      screen: Contact,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddFriend: {
      screen: AddFriend,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Contact',
  },
);

ContactNav.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const ProfileNav = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Profile',
  },
);

ProfileNav.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const BottomNav = createBottomTabNavigator(
  {
    Chat: {
      screen: ChatNav,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return <Icon name="message-circle" size={20} color={tintColor} />;
        },
      },
    },
    Find: {
      screen: ContactNav,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return <Icon name="search" size={20} color={tintColor} />;
        },
      },
    },
    Profile: {
      screen: ProfileNav,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return <Icon name="user" size={20} color={tintColor} />;
        },
      },
    },
  },
  {
    initialRouteName: 'Chat',
    tabBarOptions: {
      activeTintColor: '#A972F4',
      activeBackgroundColor: '#fff',
      inactiveTintColor: '#4a675a',
      style: {
        backgroundColor: '#fff',
        elevation: 7,
        borderTopColor: 'transparent',
      },
    },
  },
);

const SwitchNav = createSwitchNavigator(
  {
    AuthNav,
    SplashScreenNav,
    BottomNav,
  },
  {
    initialRouteName: 'SplashScreenNav',
  },
);

const AppContainer = createAppContainer(SwitchNav);
class Router extends Component {
  render() {
    return <AppContainer />;
  }
}
export default Router;
