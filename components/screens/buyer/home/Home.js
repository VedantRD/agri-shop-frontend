import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';

const Home = () => {
    return (
        <Layout level='4' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h4'>BUYER HOME</Text>
        </Layout>
    )
}

export default Home

const styles = StyleSheet.create({})
