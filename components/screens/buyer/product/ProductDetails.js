import React, { useContext, useState } from 'react';
import { ImageBackground, View, ScrollView } from 'react-native';
import { Avatar, Button, Layout, StyleService, Text, useStyleSheet, } from '@ui-kitten/components';
import Header from '../../common/Header';
import axios from 'axios';
import url from '../../../url';
import { UserContext } from '../../../theme/ApplyTheme';
import snackbar from '../../common/Snackbar';
import MySpinner from '../../common/MySpinner';
import { InfoIcon } from '../../common/Icons';

const ProductDetails = ({ navigation, route }) => {

    const styles = useStyleSheet(themedStyles);
    const { product } = route.params
    console.log('product = ', product)
    const { state } = useContext(UserContext)
    const [loading, setLoading] = useState(false)

    // add product to cart
    const addToCart = () => {
        setLoading(true)
        let item = { product, quantity: 1 }
        axios.post(`${url}/buyer/cart/add`, { item, cartId: state.cartId })
            .then(res => {
                if (res.data.status === 'success') {
                    snackbar({ type: res.data.status, message: res.data.message })
                    console.log(res.data)
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                }
            })
            .catch(err => console.log(err))
        setLoading(false)
    }

    return (
        <>
            <Header
                title='Product Details'
                goback={true}
                navigation={navigation}
            />
            {loading ?
                <MySpinner />
                :
                <>
                    <Layout style={styles.header}>
                        <ScrollView>
                            <ImageBackground
                                style={styles.image}
                                source={{ uri: 'https://st3.depositphotos.com/1041725/31792/v/450/depositphotos_317926002-stock-illustration-basket-with-fruits-illustration-vector.jpg' }}
                            />
                            <Layout
                                style={styles.detailsContainer}
                                level='1'>
                                <View style={styles.row}>
                                    <Text
                                        style={styles.name}
                                        category='h5'>
                                        {product.name}
                                    </Text>
                                    <Text
                                        style={styles.price}
                                        category='h5'>
                                        ₹ {product.price}/{product.unit}
                                    </Text>
                                </View>
                                <Text
                                    style={styles.subtitle}
                                    appearance='hint'
                                    category='s1'>
                                    {product.category}
                                </Text>
                                <Text
                                    style={styles.description}
                                    appearance='hint'>
                                    {product.description}
                                </Text>
                                <Text
                                    style={{ textAlign: 'left', marginVertical: 16 }}
                                    category='h6'
                                >
                                    Shop Details
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Avatar
                                        shape='rounded'
                                        size='giant'
                                        source={require('../../../assets/shop-1.jpg')}
                                        style={{ width: '17%' }}
                                    />
                                    <View style={{ width: '83%', paddingLeft: 16 }}>
                                        <Text
                                            // style={{ marginLeft: 16 }}
                                            category='h6'
                                        >
                                            {product.ownedBy.shopname}
                                        </Text>
                                        <Text
                                            // style={{ marginBottom: 8 }}
                                            category='s1'
                                            appearance='hint'
                                        >
                                            {product.ownedBy.name}
                                        </Text>
                                        {/* <View style={{ maxWidth: '97%' }}> */}
                                        <Text
                                            category='s1'
                                            appearance='hint'
                                        >
                                            {product.ownedBy.address}
                                        </Text>
                                        {/* </View> */}
                                    </View>
                                </View>
                                {/* <Text
                                    style={{ marginBottom: 8 }}
                                >
                                    {product.ownedBy.address}
                                </Text> */}
                            </Layout>
                        </ScrollView>
                    </Layout>
                    <View style={styles.actionContainer}>
                        <Button
                            style={styles.actionButton}
                            size='large'
                            onPress={addToCart}
                        >
                            ADD TO CART
                        </Button>
                    </View>
                </>
            }
        </>
    )
}

export default ProductDetails

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    header: {
        flex: 1
    },
    image: {
        height: 300,
        width: '100%',
    },
    detailsContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        width: '65%',
    },
    subtitle: {
        marginTop: 8,
    },
    price: {
        textAlign: 'right',
        width: '30%'
    },
    description: {
        marginVertical: 16,
    },
    actionContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff'
    },
    actionButton: {
        // marginHorizontal: 6,
    },
    sectionLabel: {
        marginVertical: 8,
    },
});
