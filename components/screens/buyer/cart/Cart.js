import React, { useContext, useEffect, useState } from 'react';
import { Button, Layout, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { CartItem } from './CartItem';
import Header from '../../common/Header'
import axios from 'axios';
import url from '../../../url';
import { UserContext } from '../../../theme/ApplyTheme';
import MySpinner from '../../common/MySpinner';
import snackbar from '../../common/Snackbar';

const Cart = ({ navigation }) => {

    const styles = useStyleSheet(themedStyle);
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const { state } = useContext(UserContext)

    const totalCost = () => {
        return items.reduce((acc, item) => item.product ? (acc + item.product.price * item.quantity) : 0, 0);
    };

    const onItemRemove = (item, index) => {
        items.splice(index, 1);
        // setItems([...items]);
        console.log(items.length)
        updateCart([...items])
    };

    const onItemChange = (item, index) => {
        items[index] = item;
        // setItems([...items]);
        updateCart([...items])
    };

    const renderProductItem = (info) => (
        <CartItem
            style={styles.item}
            index={info.index}
            product={info.item}
            onProductChange={onItemChange}
            onRemove={onItemRemove}
        />
    );

    const updateCart = (items) => {
        setLoading(true)
        axios.post(`${url}/buyer/cart/update`, { cartId: state.cartId, items })
            .then(res => {
                if (res.data.status === 'success') {
                    setItems(res.data.cart.items)
                    // snackbar({ type: res.data.status, message: res.data.message })
                    console.log(res.data.cart.items.length, 'items =', res.data.cart.items)
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                }
            })
            .catch(err => console.log(err))
        setLoading(false)
    }

    const placeOrder = () => {
        setLoading(true)
        axios.post(`${url}/buyer/order/create`, { buyerId: state._id, items, buyerAddress: state.address, sellerId: items[0].product.ownedBy, total: totalCost() })
            .then(res => {
                if (res.data.status === 'success') {
                    snackbar({ type: res.data.status, message: res.data.message })
                    setItems([])
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                }
            })
            .catch(err => console.log(err))
        setLoading(false)
    }

    // get user cart
    useEffect(() => {
        setLoading(true)
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`${url}/buyer/${state._id}/cart`)
                .then(res => {
                    if (res.data.status === 'success') {
                        setItems(res.data.cart.items)
                        console.log(res.data.cart)
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

    return (
        <>
            <Header title='Cart' />
            <Layout
                style={styles.container}
                level='2'>
                {loading ?
                    <MySpinner />
                    :
                    <>
                        {items.length == 0 ?
                            <Text
                                category='h6'
                                appearance='hint'
                                style={styles.emptyListText}
                            >
                                Your cart is empty
                            </Text>
                            :
                            <List
                                data={items}
                                renderItem={renderProductItem}
                            />
                        }
                        <Layout style={styles.footer}>
                            <Text>
                                <Text category='h6' style={{ fontWeight: 'bold' }}>Total : </Text>
                                <Text category='h6' style={{ fontWeight: 'bold' }}>{`₹ ${totalCost()}`}</Text>
                            </Text>
                            <Button
                                style={styles.checkoutButton}
                                size='medium'
                                onPress={placeOrder}
                            >
                                ORDER
                            </Button>
                        </Layout>
                    </>
                }
            </Layout>
        </>
    )
}

export default Cart

const themedStyle = StyleService.create({
    container: {
        flex: 1,
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: 'background-basic-color-3',
    },
    emptyListText: {
        flex: 1,
        marginVertical: 25,
        textAlign: 'center'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 0.5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        backgroundColor: 'background-basic-color-3',
    },
    checkoutButton: {
        width: '35%'
    },
});
