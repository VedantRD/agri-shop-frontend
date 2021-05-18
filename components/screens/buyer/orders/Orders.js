import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { Card, List, Text, Layout } from '@ui-kitten/components';
import axios from 'axios';
import url from '../../../url';
import { UserContext } from '../../../theme/ApplyTheme';
import MySpinner from '../../common/MySpinner';
import Header from '../../common/Header'
import snackbar from '../../common/Snackbar';

const data = new Array(8).fill({
    title: 'Item',
});

const Orders = ({ navigation }) => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const { state } = useContext(UserContext)

    // get user orders
    useEffect(() => {
        setLoading(true)
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`${url}/buyer/${state._id}/orders`)
                .then(res => {
                    if (res.data.status === 'success') {
                        setOrders(res.data.orders)
                        console.log(res.data.orders)
                    }
                    else {
                        snackbar({ type: res.data.status, message: res.data.message })
                    }
                })
                .catch(err => console.log(err))
        })
        setLoading(false)
        return unsubscribe;
    }, [navigation])

    const renderItemHeader = (headerProps, info) => (
        <View {...headerProps}>
            <Text category='h6' style={{ fontWeight: 'bold' }}>
                {info.item.seller.shopname}
            </Text>
        </View>
    );

    const renderItemFooter = (footerProps) => (
        <Text {...footerProps}>
            Confirmed
        </Text>
    );

    const renderItem = (info) => (
        <Card
            style={styles.item}
            // status='warning'
            header={headerProps => renderItemHeader(headerProps, info)}
            footer={renderItemFooter}>
            <Text category='h6' style={styles.totalText}>₹ {info.item.total}</Text>
            <Text style={styles.address}>Delivery by 22 May, 2021</Text>
            <Text style={styles.address}>Flat no 102, Raj Residency O, Shardanagar, Near Anandnagar, Nanded</Text>
        </Card>
    );

    return (
        <>
            <Header title='My Orders' />
            <Layout level='4' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {loading ?
                    <MySpinner />
                    :
                    <>
                        {orders.length == 0 ?
                            <Text
                                category='h6'
                                appearance='hint'
                                style={styles.emptyListText}
                            >
                                You have no orders
                            </Text>
                            :
                            <List
                                style={styles.container}
                                contentContainerStyle={styles.contentContainer}
                                data={orders}
                                renderItem={renderItem}
                            />
                        }
                    </>
                }
            </Layout>
        </>
    );
}
export default Orders

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingTop: 10,
    },
    item: {
        // marginVertical: 4,
        marginBottom: 10
    },
    totalText: {
        textAlign: 'right'
    },
    address: {
        marginBottom: 10
    },
    emptyListText: {
        flex: 1,
        marginVertical: 25,
        textAlign: 'center'
    },
});