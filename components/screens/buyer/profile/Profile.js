import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Layout, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {

    const logout = () => {
        AsyncStorage.removeItem('user')
            .then(() => {
                navigation.replace('LOADING')
            })
            .catch(err => console.log(err))
    }

    return (
        <Layout level='4' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h4'>BUYER PROFILE</Text>
            <Button status='danger' style={{ width: '50%', marginTop: 25 }} onPress={logout}>Logout</Button>
        </Layout>
    )
}

export default Profile

const styles = StyleSheet.create({})
