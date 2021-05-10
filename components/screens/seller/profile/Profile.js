import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';

const Profile = () => {
    return (
        <Layout level='4' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h4'>PROFILE</Text>
        </Layout>
    )
}

export default Profile

const styles = StyleSheet.create({})
