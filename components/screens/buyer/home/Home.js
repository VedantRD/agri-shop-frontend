import React from 'react'
import { Dimensions, ImageBackground, ListRenderItemInfo, View, StyleSheet } from 'react-native';
import { Button, Card, Layout, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { PhoneIcon, CartIcon } from '../../common/Icons';
import Header from '../../common/Header'

const Home = ({ navigation }) => {

    const styles = useStyleSheet(themedStyles);

    const renderItemFooter = () => (
        <View style={styles.itemFooter}>
            <Text category='s1'>
                ₹ 200
            </Text>
            <Button
                style={styles.iconButton}
                size='small'
                accessoryLeft={CartIcon}
            />
        </View>
    );

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
            footer={() => renderItemFooter()}
            onPress={() => navigation.navigate('PRODUCT_DETAILS')}
        >
            <Text category='s1'>
                Chair
            </Text>
            <Text
                appearance='hint'
                category='c1'>
                Furniture
            </Text>
        </Card>
    );

    const products = [
        { id: 1, name: 'boat headphones', category: 'electronics', price: 100 },
        { id: 1, name: 'boat headphones', category: 'electronics', price: 100 },
        { id: 1, name: 'boat headphones', category: 'electronics', price: 100 },
    ]

    return (
        <>
            <Header title='Home' />
            <Layout level='4' style={styles.container}>
                <List
                    contentContainerStyle={styles.productList}
                    data={products}
                    numColumns={2}
                    renderItem={renderProductItem}
                />
            </Layout>
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
        paddingVertical: 16,
    },
    productItem: {
        flex: 1,
        margin: 8,
        maxWidth: Dimensions.get('window').width / 2 - 24,
        backgroundColor: 'background-basic-color-1',
    },
    itemHeader: {
        height: 140,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
});
