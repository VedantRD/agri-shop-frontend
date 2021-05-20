import React, { useState, useContext } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Layout, Text, Input, Button, useTheme, Select, SelectItem } from '@ui-kitten/components';
import Header from '../../common/Header'
import { KeyboardAvoidingView } from '../../common/extra';
import { UserContext } from '../../../theme/ApplyTheme'
import axios from 'axios'
import url from '../../../url'
import snackbar from '../../common/Snackbar';

const AddProduct = ({ navigation }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const categories = ['Organic', 'Non Organic'];
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [category, setCategory] = React.useState(null);
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const { state } = useContext(UserContext)

    const theme = useTheme()

    const selectCategory = (index) => {
        setSelectedIndex(index)
        setCategory(categories[index.row])
    }

    const addNewProduct = () => {
        console.log(category)
        axios.post(`${url}/seller/addproduct`, { name, description, price, quantity, ownedBy: state._id, category })
            .then(res => {
                if (res.data.status === 'success') {
                    snackbar({ type: res.data.status, message: res.data.message })
                    navigation.navigate('Seller_Home')
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Header title='Add Product' />
            <Layout level='4' style={styles.container}>
                <ScrollView style={{ padding: 15 }}>
                    <KeyboardAvoidingView>
                        <Text style={styles.label}>Product Name</Text>
                        <Input
                            placeholder='Product Name'
                            size='large'
                            value={name}
                            onChangeText={nextValue => setName(nextValue)}
                            style={styles.input}
                        />
                        <Text style={styles.label}>Description</Text>
                        <Input
                            placeholder='Description'
                            multiline={true}
                            value={description}
                            onChangeText={nextValue => setDescription(nextValue)}
                            style={styles.input}
                            textStyle={{ minHeight: 100, textAlignVertical: 'top', paddingTop: 10 }}
                        />
                        <Text style={styles.label}>Category</Text>
                        <Select
                            size='large'
                            selectedIndex={selectedIndex}
                            onSelect={index => selectCategory(index)}
                            value={category}
                            style={styles.input}
                        >
                            <SelectItem title='Organic' />
                            <SelectItem title='Non Organic' />
                        </Select>
                        <Text style={styles.label}>Price</Text>
                        <Input
                            placeholder='Price'
                            size='large'
                            value={price}
                            onChangeText={nextValue => setPrice(nextValue)}
                            style={styles.input}
                        />
                        <Text style={styles.label}>Quantity</Text>
                        <Input
                            placeholder='Quantity'
                            size='large'
                            value={quantity}
                            onChangeText={nextValue => setQuantity(nextValue)}
                            style={styles.input}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
                <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
                    <Button
                        style={styles.button}
                        size='large'
                        onPress={addNewProduct}
                    >
                        ADD PRODUCT
                    </Button>
                </View>
            </Layout>
        </>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 15
    },
    title: {
        marginBottom: 50
    },
    label: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 10,
        width: '100%',
        marginLeft: 5
    },
    input: {
        marginBottom: 15
    },
    button: {
        width: '100%',
        // marginTop: 15,
    }
})
