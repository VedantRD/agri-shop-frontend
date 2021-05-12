import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

import Orders from '../../screens/buyer/orders/Orders'
import HomeStack from './HomeStack'
import Profile from '../../screens/buyer/profile/Profile';
const { Navigator, Screen } = createBottomTabNavigator();
import { PersonIcon, BellIcon, HomeIcon, CartIcon, BreifcaseIcon } from '../../screens/common/Icons'
import Cart from '../../screens/buyer/cart/Cart';

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title={'Home'} icon={HomeIcon} style={{ paddingVertical: 4 }} />
    <BottomNavigationTab title={'Orders'} icon={BreifcaseIcon} style={{ paddingVertical: 4 }} />
    <BottomNavigationTab title={'Cart'} icon={CartIcon} style={{ paddingVertical: 4 }} />
    <BottomNavigationTab title={'Profile'} icon={PersonIcon} style={{ paddingVertical: 4 }} />
  </BottomNavigation>
);

const BuyerTabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={HomeStack} />
    <Screen name='Orders' component={Orders} />
    <Screen name='Cart' component={Cart} />
    <Screen name='Profile' component={Profile} />
  </Navigator>
);

export default BuyerTabNavigator