import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';
import Home from '../../screens/seller/home/Home'
import Profile from '../../screens/seller/profile/Profile'
const { Navigator, Screen } = createBottomTabNavigator();
import { PersonIcon, BreifcaseIcon, HomeIcon, PlusOutlineIcon } from '../../screens/common/Icons'
import MyProducts from '../../screens/seller/products/MyProducts'

const OrdersScreen = () => (
  <Layout level='4' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h4'>ORDERS</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title={'Home'} icon={HomeIcon} style={{ paddingVertical: 4 }} />
    <BottomNavigationTab title={'Add Product'} icon={PlusOutlineIcon} style={{ paddingVertical: 4 }} />
    <BottomNavigationTab title={'Orders'} icon={BreifcaseIcon} style={{ paddingVertical: 4 }} />
    <BottomNavigationTab title={'Profile'} icon={PersonIcon} style={{ paddingVertical: 4 }} />
  </BottomNavigation>
);

const SellerTabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={MyProducts} />
    <Screen name='Add Product' component={OrdersScreen} />
    <Screen name='Orders' component={OrdersScreen} />
    <Screen name='Profile' component={Profile} />
  </Navigator>
);

export default SellerTabNavigator