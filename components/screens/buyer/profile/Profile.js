import React, { useContext } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Layout, Text, Avatar, Divider, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraIcon } from '../../common/Icons'
import { UserContext } from '../../../theme/ApplyTheme'
import Header from '../../common/Header'

const Profile = ({ navigation }) => {

    const styles = useStyleSheet(themedStyles);
    const { state } = useContext(UserContext)

    const logout = () => {
        AsyncStorage.removeItem('user')
            .then(() => {
                navigation.replace('LOADING')
            })
            .catch(err => console.log(err))
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Header title="Profile" />
            <Layout style={styles.photoSection} level='1'>

                {/* left photo section */}
                <View>
                    <Avatar
                        source={require('../../../assets/customer-2.jpg')}
                        style={styles.photo}
                    />
                    <Button
                        style={styles.photoButton}
                        size='small'
                        status='basic'
                        accessoryLeft={CameraIcon}
                    />
                </View>

                {/* right name section */}
                <View style={styles.nameSection}>
                    <Text category='p1' appearance='hint' style={{ marginHorizontal: 16 }}>
                        Name
                    </Text>
                    <Layout
                        level='1'
                        style={[styles.nameContainer]}>
                        <Text category='h6'>
                            {state.name}
                        </Text>
                    </Layout>
                    <Divider />
                </View>
            </Layout>

            <View style={styles.descriptionContainer}>
                <Text style={styles.description} category='p1' appearance='hint'>
                    Mobile Number
                </Text>
                <Text style={styles.description} category='h6'>
                    {state.mobileNo}
                </Text>
            </View>

            {/* Address section */}
            <View style={[styles.descriptionContainer, { paddingBottom: 20 }]}>
                <Text style={styles.description} category='p1' appearance='hint'>
                    Address
                </Text>
                <Text style={styles.description} category='h6'>
                    {state.address}
                </Text>
            </View>

            {/* Bottom Section */}
            <View style={{ marginVertical: 16 }}>
                <View style={{ backgroundColor: '#fff', marginVertical: 2 }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={styles.options}>
                        <Icon name='edit-outline' fill="#000" style={{ width: 25, height: 25 }} />
                        <Text
                            category='h6' style={{ marginLeft: 10 }}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#fff', marginVertical: 2 }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={styles.options}
                    >
                        <Icon name='file-outline' fill="#000" style={{ width: 25, height: 25 }} />
                        <Text
                            category='h6' style={{ marginLeft: 10 }}>
                            About us
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#fff', marginVertical: 2 }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={styles.options}
                        onPress={() => logout()}
                    >
                        <Icon name='log-out-outline' fill="#000" style={{ width: 25, height: 25 }} />
                        <Text
                            category='h6'
                            style={{ marginLeft: 10 }}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    )
}

export default Profile

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-4',
    },
    contentContainer: {
        paddingBottom: 24,
    },
    photoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 24,
        marginTop: 4
    },
    photo: {
        aspectRatio: 1.0,
        height: 120,
        marginHorizontal: 8,
    },
    photoButton: {
        aspectRatio: 1.0,
        height: 32,
        borderRadius: 16,
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 0,
    },
    nameSection: {
        flex: 1,
        marginHorizontal: 16,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    descriptionContainer: {
        backgroundColor: 'background-basic-color-1',
        padding: 4,
    },
    description: {
        paddingHorizontal: 14,
        paddingVertical: 4,
    },
    options: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingLeft: 24,
    }
})
