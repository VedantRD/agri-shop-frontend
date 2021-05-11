import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

import Orders from '../../screens/buyer/orders/Orders'
import HomeStack from './HomeStack'
import Profile from '../../screens/buyer/profile/Profile';
const { Navigator, Screen } = createBottomTabNavigator();
import { PersonIcon, BellIcon, HomeIcon } from '../../screens/common/Icons'

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={BellIcon} />
    <BottomNavigationTab icon={PersonIcon} />
  </BottomNavigation>
);

const BuyerTabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={HomeStack} />
    <Screen name='Orders' component={Orders} />
    <Screen name='Profile' component={Profile} />
  </Navigator>
);

export default BuyerTabNavigator