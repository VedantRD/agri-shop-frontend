import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';
import Home from '../../screens/buyer/home/Home';
import Profile from '../../screens/buyer/profile/Profile';
const { Navigator, Screen } = createBottomTabNavigator();

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline' />
);

const BellIcon = (props) => (
  <Icon {...props} name='bell-outline' />
);

const HomeIcon = (props) => (
  <Icon {...props} name='home-outline' />
);

const OrdersScreen = () => (
  <Layout level='4' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h4'>ORDERS</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={BellIcon} />
    <BottomNavigationTab icon={PersonIcon} />
  </BottomNavigation>
);

const SellerTabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={Home} />
    <Screen name='Orders' component={OrdersScreen} />
    <Screen name='Profile' component={Profile} />
  </Navigator>
);

export default SellerTabNavigator