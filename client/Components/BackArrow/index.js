import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";

const BackArrow = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack('Main Page');
                }}>
                <Icon name="arrow-back" size={30} color="#000" />

                {/* <Image source={require('./assets/images/icons/drawer.png')} /> */}
            </TouchableOpacity>
        </View>
    );
};

export default BackArrow;