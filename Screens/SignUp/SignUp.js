import React, { isValidElement, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import signUpStyle  from './style'

export default function SignUp({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [formData, setformData] = useState({
    FirstName: "",
    LastName: "",
    Age: 0,
    Email: "",
    Password: "",
    isValidFirst: true,
    isValidEmail: true,
    btnState: true,
    nullInputs: false,
  });

  const handle_firstname = (value) => {
    setformData((currentState) => ({
      ...currentState,
      FirstName: value,
    }));
  };

  const handleSignUpValidation = () => {
    const f = formData.FirstName.trim();
    if (f === "") {
        setformData((currentState) => ({
      ...currentState,
      isValidFirst: false,
    }));
      
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
      <SafeAreaView style={signUpStyle.container}>
        <View style={signUpStyle.header}>
          <Text style={signUpStyle.title}>Welcome!</Text>
          <Text style={signUpStyle.sub_title}>Create new account</Text>
        </View>
        <View style={signUpStyle.footer}>
          <View style={signUpStyle.block}>
            <AntDesign
              name="user"
              size={24}
              color="black"
              style={signUpStyle.block_icon}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="First Name"
              style={signUpStyle.block_text}
              value={formData.FirstName}
              onChangeText={(value) => handle_firstname(value)}
            ></TextInput>
          </View>
          <View style={signUpStyle.block}>
            <AntDesign
              name="user"
              size={24}
              color="black"
              style={signUpStyle.block_icon}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Last Name"
              style={signUpStyle.block_text}
            ></TextInput>
          </View>
          <View style={signUpStyle.block}>
            <Feather
              style={signUpStyle.block_icon}
              name="calendar"
              size={24}
              color="black"
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Age"
              style={signUpStyle.block_text}
            ></TextInput>
          </View>
          <View style={signUpStyle.block}>
            <Fontisto
              style={signUpStyle.block_icon}
              name="email"
              size={24}
              color="black"
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Email"
              style={signUpStyle.block_text}
            ></TextInput>
          </View>

          <View style={signUpStyle.block}>
            <MaterialIcons
              style={signUpStyle.block_icon}
              name="lock-outline"
              size={24}
              color="black"
            />
            <TextInput
              style={signUpStyle.block_text}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
            ></TextInput>
          </View>
          <View style={signUpStyle.terms}>
            <Switch
              // color="black"
              // trackcolor={{ true: "#02495d" }}
              onValueChange={toggleSwitch}
              value={isEnabled}
            ></Switch>
            <Text style={signUpStyle.terms_text}>Agree to </Text>
            <TouchableOpacity>
              <Text style={signUpStyle.terms_link}>terms and conditions</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onClick={handleSignUpValidation}
            disabled={!isEnabled  || !formData.isValidFirst}
            style={signUpStyle.sign_up}
          >
            <Text style={signUpStyle.btn_text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
}

