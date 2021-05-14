import React, { useContext, useEffect, useState } from 'react';
import { Button, Layout, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { CartItem } from './CartItem';
import Header from '../../common/Header'
import axios from 'axios';
import url from '../../../url';
import { UserContext } from '../../../theme/ApplyTheme';
import MySpinner from '../../common/MySpinner';

const Cart = ({ navigation }) => {

    const styles = useStyleSheet(themedStyle);
    const [items, setItems] = useState([
        { id: 1, name: 'boat headphones', category: 'electronics', price: 100, amount: 1 },
        { id: 1, name: 'boat headphones', category: 'electronics', price: 100, amount: 1 },
        { id: 1, name: 'boat headphones', category: 'electronics', price: 200, amount: 1 },
    ])
    const [loading, setLoading] = useState(true)
    const { state } = useContext(UserContext)

    const totalCost = () => {
        return items.reduce((acc, item) => acc + item.price * item.amount, 0);
    };

    const onItemRemove = (item, index) => {
        items.splice(index, 1);
        setItems([...items]);
    };

    const onItemChange = (item, index) => {
        items[index] = item;
        setItems([...items]);
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

    // get all products
    useEffect(() => {
        setLoading(true)
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`${url}/buyer/${state._id}/cart`)
                .then(res => {
                    if (res.data.status === 'success') {
                        setItems(res.data.cart.items)
                    }
                    else {
                        snackbar({ type: res.data.status, message: res.data.message })
                    }
                    setLoading(false)
                })
                .catch(err => console.log(err))
        })
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
                                size='medium'>
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
