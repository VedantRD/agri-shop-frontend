import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import Profile from '../../screens/seller/profile/Profile'
const { Navigator, Screen } = createBottomTabNavigator();
import { PersonIcon, BreifcaseIcon, HomeIcon, PlusOutlineIcon } from '../../screens/common/Icons'
import AddProduct from '../../screens/seller/products/AddProduct';
import Home from '../../screens/seller/home/Home';

const OrdersScreen = () => (
  <Layout level='4' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h4'>ORDERS</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title='Home' icon={HomeIcon} style={styles.tab} />
    <BottomNavigationTab title='Add Product' icon={PlusOutlineIcon} style={styles.tab} />
    <BottomNavigationTab title='Orders' icon={BreifcaseIcon} style={styles.tab} />
    <BottomNavigationTab title='Profile' icon={PersonIcon} style={styles.tab} />
  </BottomNavigation>
);

const SellerTabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />} tabBarOptions={{ keyboardHidesTabBar: true }}>
    <Screen name='Seller_Home' component={Home} />
    <Screen name='Add_Product' component={AddProduct} />
    <Screen name='Seller_Orders' component={OrdersScreen} />
    <Screen name='Seller_Profile' component={Profile} />
  </Navigator>
);

export default SellerTabNavigator

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 3
  }
})