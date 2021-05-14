import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Layout, Text, Icon } from '@ui-kitten/components';

const ChooseProfile = ({ navigation }) => {
    return (
        <Layout level='4' style={styles.container}>
            <Text style={{
                color: '#0D47A1',
                fontSize: 60,
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                textShadowRadius: 2,
                shadowColor: '#4CAF50',
                textShadowOffset: { width: 4, height: 4 },
                textTransform: 'capitalize',
                marginBottom: 100,
                marginTop: 50
            }}>
                AgriShop
            </Text>
            <Text category='h4' style={{ marginBottom: 50, textAlign: 'center' }}>Choose Profile</Text>
            <View style={styles.row}>
                <Card
                    style={styles.card} status='primary'
                    onPress={() => navigation.navigate('BUYER_LOGIN')}
                >
                    <Icon
                        style={styles.icon}
                        fill='#8F9BB3'
                        name='person'
                    />
                    <Text category='h6' style={styles.cardText}>Customer</Text>
                </Card>

                <Card
                    style={styles.card} status='success'
                    onPress={() => navigation.navigate('SELLER_LOGIN')}
                >
                    <Icon
                        style={styles.icon}
                        fill='#8F9BB3'
                        name='car'
                    />
                    <Text category='h6' style={styles.cardText}>Farmer</Text>
                </Card>
            </View>
        </Layout>
    )
}

export default ChooseProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        width: '40%',
        height: 125
    },
    card: {
        flex: 1,
        margin: 15
    },
    cardText: {
        textAlign: 'center'
    },
    icon: {
        width: 32,
        height: 32,
        alignSelf: 'center',
        marginBottom: 15,
        marginTop: 10
    },
})
