import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, ImageBackground, View, } from 'react-native';
import { Button, Card, Layout, List, StyleService, Text, useStyleSheet, Input, Icon } from '@ui-kitten/components';
import { CartIcon, SearchIcon } from '../../common/Icons';
import Header from '../../common/Header'
import { UserContext } from '../../../theme/ApplyTheme'
import axios from 'axios';
import url from '../../../url';
import snackbar from '../../common/Snackbar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MySpinner from '../../common/MySpinner';

const Products = ({ navigation }) => {

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
            source={{ uri: 'https://st3.depositphotos.com/1041725/31792/v/450/depositphotos_317926002-stock-illustration-basket-with-fruits-illustration-vector.jpg' }}
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
                {info.item.category}
            </Text>
            <View style={styles.itemFooter}>
                <Text category='h5'>
                    ₹ {info.item.price} / {info.item.unit}
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
            <Header title='Products' goback={true} navigation={navigation} />
            {loading ?
                <MySpinner />
                :
                <Layout level='4' style={styles.container}>

                    {/* searchbar */}
                    <Input
                        style={{ margin: 10 }}
                        accessoryRight={SearchIcon}
                        size='large'
                        placeholder='Search your favorite product'
                    />

                    {products.length == 0 ?
                        <Layout level='4' style={{ flex: 1, justifyContent: 'center' }}>
                            <Text
                                category='h6'
                                appearance='hint'
                                style={styles.emptyListText}
                            >
                                No products to show currently
                            </Text>
                        </Layout>
                        :

                        <List
                            contentContainerStyle={styles.productList}
                            data={products}
                            numColumns={1}
                            renderItem={renderProductItem}
                        />
                    }
                </Layout>
            }
        </>
    )
}

export default Products

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        // backgroundColor: 'background-basic-color-2',
        // padding: 10
    },
    productList: {
        // paddingHorizontal: 8,
        // paddingTop: 8,        
        backgroundColor: 'background-basic-color-4',
    },
    productItem: {
        flex: 1,
        margin: 8,
        // maxWidth: Dimensions.get('window').width - 16,
        // backgroundColor: 'background-basic-color-4',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    itemHeader: {
        height: 200,
        // height: '100%' 
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
    emptyListText: {
        // flex: 1,
        marginVertical: 25,
        textAlign: 'center'
    },
});
