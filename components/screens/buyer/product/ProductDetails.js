import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, Layout, StyleService, Text, useStyleSheet, } from '@ui-kitten/components';
import Header from '../../common/Header';

const ProductDetails = ({ navigation }) => {

    const styles = useStyleSheet(themedStyles);

    return (
        <>
            <Header
                title='Product Details'
                goback={true}
                navigation={navigation}
            />
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
                            Boat Rockerz Headphones 255 pro+
                        </Text>
                        <Text
                            style={styles.price}
                            category='h4'>
                            ₹ 200000
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
                        Very nice product. buy it.
                    </Text>
                </Layout>
            </Layout>
            <View style={styles.actionContainer}>
                <Button
                    style={styles.actionButton}
                    size='large'
                >
                    BUY
                </Button>
                <Button
                    style={[styles.actionButton, { backgroundColor: '#fff' }]}
                    size='large'
                    appearance='outline'
                >
                    ADD TO CART
                </Button>
            </View>
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
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 6,
    },
    sectionLabel: {
        marginVertical: 8,
    },
});
