import React, { useState } from "react";
import { api } from "../../api/index";
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
import style from "./style";

export default function SignUp({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [formData, setformData] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    Phone: "",
    Email: "",
    Password: "",
    isValidFirst: false,
    isValidLast: false,
    isValidAge: false,
    isValidEmail: false,
    isValidPassword: false,
  });

  const handle_firstname = (value) => {
    setformData((currentState) => ({
      ...currentState,
      FirstName: value,
    }));
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
  };
  const handle_lastname = (value) => {
    setformData((currentState) => ({
      ...currentState,
      LastName: value,
    }));
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
  };
  const handle_age = (value) => {
    setformData((currentState) => ({
      ...currentState,
      Age: value,
    }));
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
  };
  const handle_email = (value) => {
    setformData((currentState) => ({
      ...currentState,
      Email: value,
    }));
    let regexAge =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexAge.test(String(value).toLowerCase())) {
      setformData((currentState) => ({
        ...currentState,
        isValidEmail: true,
      }));
    } else {
      setformData((currentState) => ({
        ...currentState,
        isValidEmail: false,
      }));
    }
  };
  const handle_password = (value) => {
    setformData((currentState) => ({
      ...currentState,
      Password: value,
    }));
    if (value.length > 7) {
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
  };
  // for entering data in backend
  async function handleSignUpValidation() {
    let f = formData.FirstName;
    let l = formData.LastName;
    let a = formData.Age;
    let m = formData.Phone;
    let e = formData.Email;
    let p = formData.Password;
    let t = isEnabled;
    let item = {
      firstname: f,
      lastname: l,
      age: a,
      mobile: m,
      userId: e,
      password: p,
      terms: t,
    };
    // let result = await fetch(
    //   "https://enigmatic-temple-22499.herokuapp.com/api/users/signUp",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(item),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   }
    // );
    // result = await result.json();
    result = api.signUp(item);
    alert("User created");
    navigation.goBack();
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
                onChangeText={(value) => handle_firstname(value)}
              ></TextInput>
            </View>
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
              ></TextInput>
            </View>
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
              ></TextInput>
            </View>
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
              ></TextInput>
            </View>
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
              ></TextInput>
            </View>
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
              ></TextInput>
            </View>
            <View style={style.terms}>
              <Switch onValueChange={toggleSwitch} value={isEnabled}></Switch>
              <Text style={style.terms_text}>Agree to </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("TermsAndConditions");
                }}
              >
                <Text style={style.terms_link}>terms and conditions</Text>
              </TouchableOpacity>
            </View>
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
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
