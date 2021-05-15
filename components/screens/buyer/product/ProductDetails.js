import React, { useContext, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, Layout, StyleService, Text, useStyleSheet, } from '@ui-kitten/components';
import Header from '../../common/Header';
import axios from 'axios';
import url from '../../../url';
import { UserContext } from '../../../theme/ApplyTheme';
import snackbar from '../../common/Snackbar';
import MySpinner from '../../common/MySpinner';

const ProductDetails = ({ navigation, route }) => {

    const styles = useStyleSheet(themedStyles);
    const { product } = route.params
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
                        <ImageBackground
                            style={styles.image}
                            source={{ uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }}
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
                                    category='h4'>
                                    ₹ {product.price}
                                </Text>
                            </View>
                            <Text
                                style={styles.subtitle}
                                appearance='hint'
                                category='s1'>
                                Electronics
                            </Text>
                            <Text
                                style={styles.description}
                                appearance='hint'>
                                {product.description}
                            </Text>
                        </Layout>
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
