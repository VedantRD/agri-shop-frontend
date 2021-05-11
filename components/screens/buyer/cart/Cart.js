import React, { useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Button, Layout, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { CartItem } from './CartItem';
import Header from '../../common/Header'

const Cart = () => {

    const styles = useStyleSheet(themedStyle);
    const [products, setProducts] = useState([
        { id: 1, name: 'boat headphones', category: 'electronics', price: 100, amount: 1 },
        { id: 1, name: 'boat headphones', category: 'electronics', price: 100, amount: 1 },
        { id: 1, name: 'boat headphones', category: 'electronics', price: 200, amount: 1 },
        { id: 1, name: 'boat headphones', category: 'electronics', price: 200, amount: 1 },
        { id: 1, name: 'boat headphones', category: 'electronics', price: 200, amount: 1 },
        { id: 1, name: 'boat headphones', category: 'electronics', price: 200, amount: 1 },
    ]);

    const totalCost = () => {
        return products.reduce((acc, product) => acc + product.price * product.amount, 0);
    };

    const onItemRemove = (product, index) => {
        products.splice(index, 1);
        setProducts([...products]);
    };

    const onItemChange = (product, index) => {
        products[index] = product;
        setProducts([...products]);
    };

    const renderFooter = () => {
        return (
            <Layout style={styles.footer}>
                <Text category='h5'>Total Cost:</Text>
                <Text category='h5'>{`₹ ${totalCost()}`}</Text>
            </Layout>
        )
    }

    const renderProductItem = (info) => (
        <CartItem
            style={styles.item}
            index={info.index}
            product={info.item}
            onProductChange={onItemChange}
            onRemove={onItemRemove}
        />
    );

    return (
        <>
            <Header title='Cart' />
            <Layout
                style={styles.container}
                level='2'>
                <List
                    data={products}
                    renderItem={renderProductItem}
                // ListFooterComponent={renderFooter}
                />
                <Layout style={styles.footer}>
                    <Text category='h5'>Total Cost:</Text>
                    <Text category='h5'>{`₹ ${totalCost()}`}</Text>
                </Layout>
                <Button
                    style={styles.checkoutButton}
                    size='giant'>
                    CHECKOUT
            </Button>
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 0.5,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    checkoutButton: {
        marginHorizontal: 16,
        marginVertical: 16,
    },
});
