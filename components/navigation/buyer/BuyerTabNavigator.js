import React from 'react'
import { StyleSheet } from 'react-native'
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
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title='Home' icon={HomeIcon} style={styles.tab} />
    <BottomNavigationTab title='Orders' icon={BreifcaseIcon} style={styles.tab} />
    <BottomNavigationTab title='Cart' icon={CartIcon} style={styles.tab} />
    <BottomNavigationTab title='Profile' icon={PersonIcon} style={styles.tab} />
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

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 3
  }
})