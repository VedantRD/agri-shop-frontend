import React from 'react';
import { ImageBackground, View } from 'react-native';
import {
    Button,
    Layout,
    StyleService,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';

const ProductDetails = () => {

    const styles = useStyleSheet(themedStyles);

    return (
        <>
            <Layout style={styles.header}>
                <ImageBackground
                    style={styles.image}
                    source={{ uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }}
                />
                <Layout
                    style={styles.detailsContainer}
                    level='1'>
                    <Text
                        category='h6'>
                        Headphones
                </Text>
                    <Text
                        style={styles.subtitle}
                        appearance='hint'
                        category='p2'>
                        new item
                </Text>
                    <Text
                        style={styles.price}
                        category='h4'>
                        ₹ 2000
                </Text>
                    <Text
                        style={styles.description}
                        appearance='hint'>
                        Very nice product. buy it.
                </Text>
                    <Text
                        style={styles.sectionLabel}
                        category='h6'>
                        Size:
                </Text>
                    <Text
                        style={styles.size}
                        appearance='hint'>
                        22
                </Text>

                </Layout>
            </Layout>
            <View style={styles.actionContainer}>
                <Button
                    style={styles.actionButton}
                    size='giant'
                >
                    BUY
                </Button>
                <Button
                    style={styles.actionButton}
                    size='giant'
                    status='control'
                >
                    ADD TO BAG
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
        // marginBottom: 8,
        flex: 1
    },
    image: {
        height: 340,
        width: '100%',
    },
    detailsContainer: {
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    subtitle: {
        marginTop: 4,
    },
    price: {
        position: 'absolute',
        top: 24,
        right: 16,
    },
    description: {
        marginVertical: 16,
    },
    size: {
        marginBottom: 16,
    },
    actionContainer: {
        flexDirection: 'row',
        paddingVertical: 24,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
        // marginTop: 24,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 8,
    },
    sectionLabel: {
        marginVertical: 8,
    },
});
