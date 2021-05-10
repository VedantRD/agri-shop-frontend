import React from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical' />
);

const InfoIcon = (props) => (
    <Icon {...props} name='info' />
);

const LogoutIcon = (props) => (
    <Icon {...props} name='log-out' />
);

const Header = () => {

    const [menuVisible, setMenuVisible] = React.useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
    );

    const renderRightActions = () => (
        <React.Fragment>
            {/* <TopNavigationAction icon={EditIcon} /> */}
            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}>
                <MenuItem accessoryLeft={InfoIcon} title='About' />
                <MenuItem accessoryLeft={LogoutIcon} title='Logout' />
            </OverflowMenu>
        </React.Fragment>
    );

    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon} />
    );

    return (
        <Layout level='1'>
            <TopNavigation
                alignment='center'
                title={evaProps => <Text category='h6'>Agri Shop</Text>}
                accessoryLeft={renderBackAction}
                accessoryRight={renderRightActions}
            />
        </Layout>
    );
};

export default Header

const styles = StyleSheet.create({});