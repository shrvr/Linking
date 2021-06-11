import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../../App';

const SignOut = () => {
    const { signOut } = React.useContext(AuthContext);

    useEffect(() => {
        signOut();
    }, []);

    return (
        <View>
            <Text>Signout</Text>
        </View>
    );
};
export default SignOut;
