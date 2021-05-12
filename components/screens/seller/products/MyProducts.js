import React from 'react'
import { Dimensions, ImageBackground, View } from 'react-native';
import { Button, Card, Layout, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { EditIcon } from '../../common/Icons';
import Header from '../../common/Header'

const MyProducts = ({ navigation }) => {

    const styles = useStyleSheet(themedStyles);

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
        // onPress={() => navigation.navigate('PRODUCT_DETAILS')}
        >
            <Text category='h6' style={{ marginBottom: 5 }}>
                {info.item.name}
            </Text>
            <Text
                appearance='hint'
                category='s1'
                status='danger'
            >
                Only 3 Remaining
            </Text>
            <View style={styles.itemFooter}>
                <Text category='h6'>
                    ₹ {info.item.price}
                </Text>
                <Button
                    style={styles.iconButton}
                    size='small'
                    accessoryLeft={EditIcon}
                >
                    <Text category='h6' style={{ color: '#fff' }}>Edit Details</Text>
                </Button>
            </View>
        </Card>
    );

    const products = [
        { id: 1, name: 'boat headphones 255 pro+', category: 'electronics', price: 1599 },
        { id: 1, name: 'boat headphones 335', category: 'electronics', price: 1299 },
        { id: 1, name: 'boat rockerz headphones', category: 'electronics', price: 1399 },
    ]

    return (
        <>
            <Header title='My Products' />
            <Layout level='4' style={styles.container}>
                <List
                    contentContainerStyle={styles.productList}
                    data={products}
                    numColumns={1}
                    renderItem={renderProductItem}
                />
            </Layout>
        </>
    )
}

export default MyProducts

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    productList: {
        paddingHorizontal: 4,
        paddingVertical: 8,
    },
    productItem: {
        flex: 1,
        margin: 8,
        maxWidth: Dimensions.get('window').width - 16,
        backgroundColor: 'background-basic-color-1',
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
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
    },
    iconButton: {
        paddingHorizontal: 0,
        width: '50%',
    },
});
