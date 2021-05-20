import React from 'react'
import { StyleSheet, View, ScrollView, Linking, TouchableOpacity } from 'react-native'
import { Layout, Text, Divider, Card, Icon, Button } from '@ui-kitten/components'
import Header from '../../common/Header'

const data = new Array(8).fill({
    title: 'Item',
});

const OrderDetails = ({ navigation, route }) => {

    const { order } = route.params

    const dialCall = () => {
        let phoneNumber = order.seller.mobileNo;
        phoneNumber = `tel:${phoneNumber}`;
        Linking.openURL(phoneNumber);
    };

    return (
        <>
            <Header title='Order Summary' goback={true} navigation={navigation} />
            <Layout level='4' style={{ flex: 1 }}>
                <ScrollView nestedScrollEnabled={false} style={styles.container}>

                    {/* payment details */}
                    <Card
                        style={styles.card}
                        header={headerProps =>
                            <View {...headerProps}>
                                <Text category='h5' >
                                    Order Details
                                </Text>
                                <Text
                                    style={{ marginTop: 5 }}
                                    category='h6'
                                    status={order.status === 'confirmed' ? 'primary'
                                        :
                                        order.status === 'cancelled' ? 'danger' : 'success'
                                    }
                                >
                                    {order.status}
                                </Text>
                            </View>
                        }
                        footer={footerprops =>
                            <View {...footerprops}>
                                <View style={styles.row}>
                                    <Text category='h6' style={{ fontWeight: 'bold' }}>Total Cost</Text>
                                    <Text category='h6' style={{ fontWeight: 'bold' }}>₹ {order.total}</Text>
                                </View>
                            </View>
                        }
                    >
                        <View style={styles.row}>
                            <Text category='h6'>Total Cost</Text>
                            <Text category='h6'>₹ {order.total}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text category='h6'>Delivery Charges</Text>
                            <Text category='h6'>₹ 30</Text>
                        </View>
                    </Card>

                    {/* seller details */}
                    <Card
                        style={styles.card}
                        header={headerProps =>
                            <Text category='h5' {...headerProps}>
                                Customer Details
                            </Text>
                        }
                    >
                        <View style={styles.sellerRow}>
                            <Icon name='person-outline' style={styles.icon} fill='#000' />
                            <Text category='h6'>{order.buyer.name}</Text>
                        </View>
                        <View style={styles.sellerRow}>
                            <Icon name='home-outline' style={styles.icon} fill='#000' />
                            <Text category='h6'>{order.buyer.address}Flat no 102, Raj Residency O, Shardanagar, Near Anandnagar, Nanded</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Icon name='phone-outline' style={styles.icon} fill='#000' />
                                <Text category='h6'>{order.seller.mobileNo}</Text>
                            </View>
                            <TouchableOpacity onPress={dialCall}>
                                <Text style={{ textAlign: 'right', fontWeight: 'bold' }} status='primary' category='h6'>CALL</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>

                    {/* ordered items */}
                    <Card
                        style={styles.card}
                        header={headerProps =>
                            <Text category='h5' {...headerProps}>
                                Ordered Items
                            </Text>
                        }
                    >
                        {order.items.map((item, i) => {
                            return (
                                <View key={i}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text>{item.quantity} x {item.product.name}</Text>
                                        <Text style={{ textAlign: 'right' }}>₹ {item.quantity * item.product.price}</Text>
                                    </View>
                                    <Divider style={{ marginVertical: 10, backgroundColor: '#ccc' }} />
                                </View>
                            )
                        })}
                    </Card>

                </ScrollView>
            </Layout>
        </>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    sellerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '75%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    rowText: {
        marginBottom: 0
    },
    card: {
        marginBottom: 10
    },
    icon: {
        height: 25, width: 25,
        marginRight: 20
    }
})
