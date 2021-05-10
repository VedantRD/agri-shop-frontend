import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Layout, Text } from '@ui-kitten/components';

const ChooseProfile = ({ navigation }) => {
    return (
        <Layout level='4' style={styles.container}>
            <Text category='h4' style={{ marginBottom: 25 }}>Choose Profile</Text>
            <Button
                style={styles.button}
                onPress={() => navigation.navigate('SELLER_LOGIN')}
            >
                Farmer
            </Button>
            <Button
                style={styles.button}
                onPress={() => navigation.navigate('BUYER_LOGIN')}
            >
                Customer
            </Button>
        </Layout>
    )
}

export default ChooseProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    button: {
        width: '100%',
        marginBottom: 15
    }
})
