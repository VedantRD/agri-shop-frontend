import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import Header from '../../common/Header'

const AddProduct = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')

    return (
        <>
            <Header title='Add Product' />
            <Layout level='4' style={styles.container}>
                {/* <Text category='h4' style={styles.title}>Add New Product</Text> */}
                <Input
                    placeholder='Product Name'
                    size='large'
                    value={name}
                    onChangeText={nextValue => setName(nextValue)}
                    style={styles.input}
                />
                <Input
                    placeholder='Description'
                    multiline={true}
                    value={description}
                    onChangeText={nextValue => setDescription(nextValue)}
                    style={styles.input}
                    textStyle={{ minHeight: 100, textAlignVertical: 'top', paddingTop: 10 }}
                />
                <Input
                    placeholder='Price'
                    size='large'
                    value={price}
                    onChangeText={nextValue => setPrice(nextValue)}
                    style={styles.input}
                />
                <Input
                    placeholder='Quantity'
                    size='large'
                    value={quantity}
                    onChangeText={nextValue => setQuantity(nextValue)}
                    style={styles.input}
                />
                <Button
                    style={styles.button}
                    size='large'
                >
                    ADD PRODUCT
                </Button>
            </Layout>
        </>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    title: {
        marginBottom: 50
    },
    input: {
        marginBottom: 15
    },
    button: {
        width: '100%',
        marginTop: 50
    }
})
