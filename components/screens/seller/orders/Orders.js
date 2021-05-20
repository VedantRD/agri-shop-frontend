import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { Card, List, Text, Layout, Button, Icon } from '@ui-kitten/components';
import axios from 'axios';
import url from '../../../url';
import { UserContext } from '../../../theme/ApplyTheme';
import MySpinner from '../../common/MySpinner';
import Header from '../../common/Header'
import snackbar from '../../common/Snackbar';

const Orders = ({ navigation }) => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const { state } = useContext(UserContext)

    // get user orders
    useEffect(() => {
        setLoading(true)
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`${url}/seller/${state._id}/orders`)
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

    const updateOrderStatus = (status, orderId, index) => {
        axios.post(`${url}/seller/order/update_status`, { orderId, status })
            .then(res => {
                if (res.data.status === 'success') {
                    orders[index].status = res.data.order.status
                    setOrders([...orders])
                    snackbar({ type: res.data.status, message: res.data.message })
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                }
            })
            .catch(err => console.log(err))
    }

    const renderItemHeader = (headerProps, info) => (
        <View {...headerProps}>
            <Text category='h6' style={{ fontWeight: 'bold' }}>
                {info.item.buyer.name}
            </Text>
        </View>
    );

    const renderItemFooter = (info) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: 10, paddingHorizontal: 25 }}>
            {info.item.status === 'Confirmed' ?
                <>
                    <Button
                        style={styles.cancelButton}
                        appearance='outline' status='danger'
                        onPress={() => updateOrderStatus('Cancelled', info.item._id, info.index)}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={styles.completeButton}
                        status='success'
                        onPress={() => updateOrderStatus('Delivered', info.item._id, info.index)}
                    >
                        Complete
                    </Button>
                </>
                :
                info.item.status === 'Cancelled' ?
                    <Text status='danger' category='h6' style={{ paddingVertical: 7.5 }}>
                        {info.item.status}
                    </Text>
                    :
                    <Text status='success' category='h6' style={{ paddingVertical: 7.5 }}>
                        {info.item.status}
                    </Text>
            }
        </View>
    );

    const renderItem = (info) => (
        <Card
            style={styles.item}
            // status='warning'
            onPress={() => navigation.navigate('ORDER_DETAILS', { order: info.item })}
            // header={headerProps => renderItemHeader(headerProps, info)}
            footer={() => renderItemFooter(info)}>
            <Text style={styles.address}>Deliver to, {info.item.buyer.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text>Delivery date -  22 May, 2021</Text>
                <Text category='p1' status='primary'>EDIT</Text>
            </View>
            <Text>Flat no 102, Raj Residency O, Shardanagar, Near Anandnagar, Nanded</Text>
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
        marginBottom: 10,
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
    cancelButton: {
        width: "35%",
        backgroundColor: '#fff',
    },
    completeButton: {
        width: "35%",
        marginLeft: 10
    }
});