import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../screens/buyer/profile/Profile';
import EditProfile from '../../screens/common/EditProfile';
const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PROFILE" component={Profile} />
            <Stack.Screen name="EDIT_PROFILE" component={EditProfile} />
        </Stack.Navigator>
    )
}

export default ProfileStack