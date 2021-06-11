import React, { useState } from 'react';
import { signUp, setStorage, getStorage } from '../../api/index';
import {
    View,
    Text,
    TextInput,
    Switch,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import style from './style';
import { AuthContext } from '../../App';

export default function SignUp({ navigation }) {
    const { signUp } = React.useContext(AuthContext);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const [formData, setformData] = useState({
        FirstName: '',
        LastName: '',
        Age: '',
        Phone: '',
        Email: '',
        Password: '',
        isValidFirst: true,
        isValidLast: true,
        isValidAge: true,
        isValidEmail: true,
        isValidPassword: true,
    });
    const [PassErrMsg, setPassErrMsg] = useState({
        shortLen: false,
        noNum: false,
    })


    {/**firstName field handle functions */}
    const handleValidFirstName = (value) =>{
        let regexFirst = /^[a-zA-Z\s]+$/;
        if (regexFirst.test(value) && value.length > 0) {
            setformData((currentState) => ({
                ...currentState,
                isValidFirst: true,
            }));
        } else {
            setformData((currentState) => ({
                ...currentState,
                isValidFirst: false,
            }));
        }
    }

    const handle_firstname = (value) => {
        setformData((currentState) => ({
            ...currentState,
            FirstName: value,
        }));
    };

    
    {/**lastName field handle functions*/}
    const handleValidLastName = (value) =>{
        let regexLast = /^[a-zA-Z\s]+$/;
        if (regexLast.test(value) && value.length > 0) {
            setformData((currentState) => ({
                ...currentState,
                isValidLast: true,
            }));
        } else {
            setformData((currentState) => ({
                ...currentState,
                isValidLast: false,
            }));
        }
    }

    const handle_lastname = (value) => {
        setformData((currentState) => ({
            ...currentState,
            LastName: value,
        }));
    };


    {/**Age field handle functions*/}
    const handleValidAge = (value) =>{
        let regexAge = /^\d+$/;
        if (regexAge.test(value) && Number(value) > 17) {
            setformData((currentState) => ({
                ...currentState,
                isValidAge: true,
            }));
        } else {
            setformData((currentState) => ({
                ...currentState,
                isValidAge: false,
            }));
        }
    } 

    const handle_age = (value) => {
        setformData((currentState) => ({
            ...currentState,
            Age: value,
        }));
    };


    {/**Email field handle functions*/}
    const handleValidEmail = (value) =>{
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
    }

    const handle_email = (value) => {
        setformData((currentState) => ({
            ...currentState,
            Email: value,
        }));
    };


    {/**Password field handle functions */}
    const handleValidPassword = (value) =>{

        //Check a password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit,
        // and one special character
        let regex_pass = /^.*(?=.{8,20})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!-_]).*$/
         
        if(regex_pass.test(value)){
            setformData((currentState) => ({
                ...currentState,
                isValidPassword: true,
            }));
        } else {
            setformData((currentState) => ({
                ...currentState,
                isValidPassword: false,
            }));
        }
        
    }

    const handle_password = (value) => {
        setformData((currentState) => ({
            ...currentState,
            Password: value,
        }));
    };

    const handlePhone = (value) => {
        setformData( (currentState) => ({
            ...currentState,
            Phone: value,
        }));
    }


    // for entering data in backend
    async function handleSignUpValidation() {
        let item = {
            firstName: formData.FirstName,
            lastName: formData.LastName,
            age: formData.Age,
            mobile: formData.Phone,
            userId: formData.Email,
            password: formData.Password,
            terms: isEnabled,
        };

        await signUp(item);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <ScrollView contentContainerStyle={{ flex: 1 }}> 
                <SafeAreaView style={style.container}>
                    <View style={style.header}>
                        <Text style={style.title}>Welcome!</Text>
                        <Text style={style.sub_title}>Create new account</Text>
                    </View>

                    <View style={style.footer}>

                        {/** FirstName Field*/}
                        <View style={style.block}>
                            <AntDesign
                                name="user"
                                size={24}
                                color="black"
                                style={style.block_icon}
                            />
                            <TextInput
                                autoCapitalize="none"
                                placeholder="First Name"
                                style={style.block_text}
                                value={formData.FirstName}
                                onChangeText={(value) =>
                                    handle_firstname(value)
                                }
                                onEndEditing={(ele) => {
                                    handleValidFirstName(ele.nativeEvent.text);
                                }}
                            ></TextInput>
                        </View>
                        {formData.isValidFirst ? null : (
                            <Text style={style.errMsg}>Invalid Firstname !</Text>
                        )}

                        {/** LastName Field*/}
                        <View style={style.block}>
                            <AntDesign
                                name="user"
                                size={24}
                                color="black"
                                style={style.block_icon}
                            />
                            <TextInput
                                autoCapitalize="none"
                                placeholder="Last Name"
                                style={style.block_text}
                                value={formData.LastName}
                                onChangeText={(value) => handle_lastname(value)}
                                onEndEditing={(ele) => {
                                    handleValidLastName(ele.nativeEvent.text)
                                }}
                            ></TextInput>
                        </View>
                        {formData.isValidLast ? null : (
                            <Text style={style.errMsg}>Invalid Lastname !</Text>
                        )}


                        {/** Age Field */}
                        <View style={style.block}>
                            <Feather
                                style={style.block_icon}
                                name="calendar"
                                size={24}
                                color="black"
                            />
                            <TextInput
                                autoCapitalize="none"
                                placeholder="Age"
                                style={style.block_text}
                                value={formData.Age}
                                onChangeText={(value) => handle_age(value)}
                                onEndEditing={(ele) => {
                                    handleValidAge(ele.nativeEvent.text);
                                }}
                            ></TextInput>
                        </View>
                        {formData.isValidAge ? null : (
                            <Text style={style.errMsg}>Invalid Age !</Text>
                        )}

                        {/** Phone Field */}
                        <View style={style.block}>
                            <Feather
                                style={style.block_icon}
                                name="phone"
                                size={24}
                                color="black"
                            />
                            <TextInput
                                autoCapitalize="none"
                                placeholder="Phone No. (optional)"
                                style={style.block_text}
                                onChangeText={(value) => handlePhone(value)}
                            ></TextInput>
                        </View>
                        
                        {/** Email Field*/}
                        <View style={style.block}>
                            <Fontisto
                                style={style.block_icon}
                                name="email"
                                size={24}
                                color="black"
                            />
                            <TextInput
                                autoCapitalize="none"
                                placeholder="Email"
                                style={style.block_text}
                                value={formData.Email}
                                onChangeText={(value) => handle_email(value)}
                                onEndEditing={ (ele) => {
                                    handleValidEmail(ele.nativeEvent.text)
                                }}
                            ></TextInput>
                        </View>
                        {formData.isValidEmail ? null : (
                            <Text style={style.errMsg}>Invalid Email !</Text>
                        )}

                        {/** Password Field */}
                        <View style={style.block}>
                            <MaterialIcons
                                style={style.block_icon}
                                name="lock-outline"
                                size={24}
                                color="black"
                            />
                            <TextInput
                                style={style.block_text}
                                placeholder="Password"
                                secureTextEntry={true}
                                autoCapitalize="none"
                                value={formData.Password}
                                onChangeText={(value) => handle_password(value)}
                                onEndEditing={ (ele) => {
                                    handleValidPassword(ele.nativeEvent.text)
                                }}
                            ></TextInput>
                        </View>
                        {formData.isValidPassword ? null : (
                            <Text style={style.errMsg}>Minimum password length:8 !</Text>
                        )}
                        
                    
                        {/** Terms and Conditions Element */}
                        <View style={style.terms}>
                            <Switch
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            ></Switch>
                            <Text style={style.terms_text}>Agree to </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.push('TermsAndConditions');
                                }}
                            >
                                <Text style={style.terms_link}>
                                    terms and conditions
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/** Sign Up Button */}
                        <TouchableOpacity
                            onPress={handleSignUpValidation}
                            disabled={
                                !(
                                    isEnabled &&
                                    formData.isValidLast &&
                                    formData.isValidFirst &&
                                    formData.isValidAge &&
                                    formData.isValidEmail &&
                                    formData.isValidPassword
                                )
                            }
                            style={style.sign_up}
                        >
                            <Text style={style.btn_text}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    {/** */}
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
