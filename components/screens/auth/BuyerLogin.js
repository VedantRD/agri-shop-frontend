import React, { useState } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { Button, Input, Layout, StyleService, Text, useStyleSheet, Icon, useTheme } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../common/extra';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersonIcon, PhoneIcon } from '../common/Icons';

const BuyerLogin = ({ navigation }) => {

    const [user, setUser] = useState(false)
    const [mobileNo, setMobileNo] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);

    const loginUser = () => {
        if (user) {
            AsyncStorage.setItem('user', JSON.stringify(res.data.user))
                .then(() => {
                    navigation.replace('Loading')
                    showToast(res.data.message, theme.color.success)
                })
                .catch(err => console.log(err))
        }
        else {
            showToast(res.data.message, theme.color.danger)
        }
    }

    const styles = useStyleSheet(styles2);
    const theme = useTheme();

    const onPasswordIconPress = () => {
        setPasswordVisible(!passwordVisible);
    };

    const renderPasswordIcon = (props) => (
        <TouchableWithoutFeedback onPress={onPasswordIconPress}>
            <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar
                backgroundColor={theme['color-primary-default']}
                barStyle="light-content"
            />
            <View style={styles.headerContainer}>
                <Text
                    category='h1'
                    status='control'>
                    Customer Login
                </Text>
                <Text
                    style={styles.signInLabel}
                    category='s1'
                    status='control'>
                    Sign in to your account
                </Text>
            </View>
            <Layout
                style={styles.formContainer}
                level='1'>
                <Input
                    placeholder='Mobile Number'
                    size='large'
                    accessoryRight={PhoneIcon}
                    value={mobileNo}
                    onChangeText={setMobileNo}
                />
                <Input
                    style={styles.passwordInput}
                    size='large'
                    placeholder='Password'
                    accessoryRight={renderPasswordIcon}
                    value={password}
                    secureTextEntry={!passwordVisible}
                    onChangeText={setPassword}
                />
                <View style={styles.forgotPasswordContainer}>
                    <Button
                        style={styles.forgotPasswordButton}
                        appearance='ghost'
                        status='basic'
                    >
                        Forgot your password?
                    </Button>
                </View>
            </Layout>
            <Button
                style={styles.signInButton}
                size='giant'>
                SIGN IN
            </Button>
            <Button
                style={styles.signUpButton}
                appearance='ghost'
                status='basic'
                onPress={() => navigation.replace('BUYER_REGISTER')}>
                Don't have an account? Create
            </Button>
        </KeyboardAvoidingView>
    )
}

export default BuyerLogin

const styles2 = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
        backgroundColor: 'color-primary-default',
    },
    formContainer: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    signInLabel: {
        marginTop: 16,
    },
    signInButton: {
        marginHorizontal: 16,
    },
    signUpButton: {
        marginVertical: 12,
        marginHorizontal: 16,
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    passwordInput: {
        marginTop: 16,
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
})
