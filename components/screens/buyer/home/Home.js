import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, ImageBackground, View, } from 'react-native';
import { Button, Card, Layout, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { CartIcon } from '../../common/Icons';
import Header from '../../common/Header'
import { UserContext } from '../../../theme/ApplyTheme'
import axios from 'axios';
import url from '../../../url';
import snackbar from '../../common/Snackbar'
import MySpinner from '../../common/MySpinner';

const Home = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const { state } = useContext(UserContext)

    const styles = useStyleSheet(themedStyles);

    // add product to cart
    const addToCart = (product) => {
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

    // get all products
    useEffect(() => {
        setLoading(true)
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`${url}/buyer/products`)
                .then(res => {
                    if (res.data.status === 'success') {
                        setProducts(res.data.products)
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

    const renderItemHeader = () => (
        <ImageBackground
            style={styles.itemHeader}
            source={{ uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }}
        />
    );

    const renderProductItem = (info) => (
        <Card
            style={styles.productItem}
            header={() => renderItemHeader()}
            onPress={() => navigation.navigate('PRODUCT_DETAILS', { product: info.item })}
        >
            <Text category='h5' style={{ marginBottom: 5 }}>
                {info.item.name}
            </Text>
            <Text
                appearance='hint'
                category='s1'>
                Furniture
            </Text>
            <View style={styles.itemFooter}>
                <Text category='h5'>
                    ₹ {info.item.price}
                </Text>
                <Button
                    style={styles.iconButton}
                    size='medium'
                    accessoryLeft={CartIcon}
                    onPress={() => addToCart(info.item)}
                />
            </View>
        </Card>
    );

    return (
        <>
            {/* <Header title='Home' /> */}
            {loading ?
                <MySpinner />
                :
                <Layout level='4' style={styles.container}>
                    <List
                        contentContainerStyle={styles.productList}
                        data={products}
                        numColumns={1}
                        renderItem={renderProductItem}
                    />
                </Layout>
            }
        </>
    )
}

export default Home

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    productList: {
        paddingHorizontal: 8,
        paddingTop: 8,
    },
    productItem: {
        flex: 1,
        marginBottom: 8,
        backgroundColor: 'background-basic-color-1',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 2,
    },
    itemHeader: {
        height: 200,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        // paddingHorizontal: 20,
    },
    iconButton: {
        width: '25%'
    },
});
