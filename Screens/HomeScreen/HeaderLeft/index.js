import React from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Entypo";

const HeaderLeft = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer());
                }}>
                <Icon name="menu" size={30} color="#000" />
                
                {/* <Image source={require('./assets/images/icons/drawer.png')} /> */}
            </TouchableOpacity>
        </View>
    );
};

export default HeaderLeft;