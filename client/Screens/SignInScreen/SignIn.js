import React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

// importing Icons
import { MaterialIcons } from '@expo/vector-icons';

// importing stylesheets
import signInPageStyle from './Style';
import { AuthContext } from '../../App';

function SignIn({ navigation }) {
    const { signIn } = React.useContext(AuthContext);
    const [formData, setformData] = useState({
        Email: '',
        Password: '',
        isValidEmail: true,
        btnState: true,
        nullInputs: false,
    });

    // Client-Side Email Validation
    const handleValidEmail = (value) => {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (regexEmail.test(value)) {
            setformData({
                ...formData,
                isValidEmail: true,
            });
        } else {
            setformData({
                ...formData,
                isValidEmail: false,
            });
        }
    };

    // Maintain Email State
    const handleEmailInput = (value) => {
        setformData((currentState) => ({
            ...currentState,
            Email: value,
        }));
    };

    // Maintain Password State
    const handlePasswordInput = (value) => {
        setformData((currentState) => ({
            ...currentState,
            Password: value,
        }));
    };

    // For Handling Api Req/Res
    // Matches User ID and Password
    const handleSignInValidation = () => {
        signIn({ userId: formData.Email, password: formData.Password });

    };

    // Sign Up navigation
    // const navigation = useNavigation();

    return (
        <View style={signInPageStyle.container}>
            {/** Header Section */}
            <View style={signInPageStyle.header}>
                <Text style={signInPageStyle.title}>Welcome back!</Text>
                <Text style={signInPageStyle.sub_title}>
                    Sign In to continue
                </Text>
            </View>

            {/** Body Section */}
            <View style={signInPageStyle.body}>
                {/** EmailView */}
                <View style={signInPageStyle.comnfieldViewStyle}>
                    <MaterialIcons
                        name="alternate-email"
                        size={24}
                        color="black"
                    />
                    <TextInput
                        style={signInPageStyle.comnTextInputStyle}
                        value={formData.Email}
                        onChangeText={(value) => handleEmailInput(value)}
                        placeholder="Your Email "
                        onEndEditing={(ele) => {
                            handleValidEmail(ele.nativeEvent.text);
                        }}
                    ></TextInput>
                </View>
                {formData.isValidEmail ? null : (
                    <Text style={signInPageStyle.errMsg}>Invalid Email !</Text>
                )}

                {/** PassView */}
                <View style={signInPageStyle.comnfieldViewStyle}>
                    <MaterialIcons
                        name="lock-outline"
                        size={24}
                        color="black"
                    />
                    <TextInput
                        style={signInPageStyle.comnTextInputStyle}
                        secureTextEntry={true}
                        value={formData.Password}
                        onChangeText={(value) => handlePasswordInput(value)}
                        placeholder="Your Password"
                    ></TextInput>
                </View>

                {/** SignIn Btn */}
                <TouchableOpacity
                    disabled={
                        formData.Email.trim() === '' ||
                        formData.Password.trim() === ''
                    }
                    onPress={handleSignInValidation}
                >
                    <View style={signInPageStyle.button}>
                        <Text style={signInPageStyle.btntext}>Sign In</Text>
                    </View>
                </TouchableOpacity>
                {formData.nullInputs && (
                    <Text style={signInPageStyle.errMsg}>null inputs</Text>
                )}

                {/** SignUp Link */}
                <View style={signInPageStyle.signUpView}>
                    <Text style={signInPageStyle.txt_signUpView}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.push('SignUp');
                        }}
                    >
                        <Text style={signInPageStyle.txt_signUpLink}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default SignIn;
