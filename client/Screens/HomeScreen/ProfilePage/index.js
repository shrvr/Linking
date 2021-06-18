import React, { isValidElement, useState, useEffect } from "react";
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
import EditIcon from "@material-ui/icons/Edit";
import * as UsersApi from "../../../api/index";
import { useScrollToTop } from "@react-navigation/native";

// fetching user data from local json file
// Once backend code will be integrated, this below code will be commented.
//const customData = require('./UserDetails.json');

export default function ProfilePage() {
  // useEffect(() => {

  //     const url = ""
  //     fetch(url).then(resp => resp.json()).then(resp => console.log(resp))

  // }, [])

  const [val, setVal] = useState({
    // FirstName: customData["First Name"],
    // LastName: customData["Last Name"],
    // Age: customData["Age"],
    // Phone: customData["Contact Number"],
    // Email: customData["Email Id"],
    // Password: customData["Password"],
    // isValidAge: true,
    // isValidPhone: true

    FirstName: "",
    LastName: "",
    Age: "",
    Phone: "",
    Email: "",
    Password: "",
    isValidAge: true,
    isValidPhone: true,
  });

  useEffect(() => {
    async function fetchData() {
      const users = await UsersApi.GetUser();
      setVal((currentState) => ({
        ...currentState,
        FirstName: users.firstName,
        LastName: users.lastName,
        Age: users.age,
        Phone: users.mobile,
        Email: users.userId,
        Password: users.password,
      }));
    }
    fetchData();
  }, []);

  const setAge = (value) => {
    setVal((currentState) => ({
      ...currentState,
      Age: value,
    }));
    let regexAge = /^\d+$/;
    if (regexAge.test(value) && Number(value) > 17) {
      setVal((currentState) => ({
        ...currentState,
        isValidAge: true,
      }));
    } else {
      setVal((currentState) => ({
        ...currentState,
        isValidAge: false,
      }));
    }
  };

  const setPhone = (value) => {
    setVal((currentState) => ({
      ...currentState,
      Phone: value,
    }));
    let regexNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let regexNum1 =
      /^(\+?\d{1,3}|\d{1,4})\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (regexNum.test(value) || regexNum1.test(value)) {
      setVal((currentState) => ({
        ...currentState,
        isValidPhone: true,
      }));
    } else {
      setVal((currentState) => ({
        ...currentState,
        isValidPhone: false,
      }));
    }
  };

  // handling changes of the fields
  const clickHandler = () => {
    if (val.isValidAge && val.isValidPhone) {
      // backend code here

      UsersApi.EditUser({
        age: val.Age,
        mobile: val.Phone,
      });

      alert("changed successfully");
    } else {
      if (!val.isValidAge) {
        if (!val.isValidPhone) {
          alert(`
                            * Age must be over 18
                            * Invalid number
                            * number format "+91XXX XXX XXXX" or "XXXXXXXXXX" 
                        `);
        } else {
          alert("age must be over 18");
        }
      } else {
        alert(`
                    * Invalid Number
                    * number format e.g: "+91XXX XXX XXXX" or "XXXXXXXXXX"`);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <SafeAreaView style={style.container}>
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
                value={val.FirstName}
                editable={false}
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
                value={val.LastName}
                editable={false}
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
                keyboardType="numeric"
                style={style.block_text}
                value={val.Age}
                onChangeText={(value) => setAge(value)}
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
                placeholder="phone number"
                keyboardType="numeric"
                style={style.block_text}
                value={val.Phone}
                onChangeText={(value) => setPhone(value)}
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
                value={val.Email}
                editable={false}
              ></TextInput>
            </View>
            {/* <View style={style.block}>
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
                value = {val.Password}   
                onChangeText={(value) => setPass(value)}          
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
                placeholder="confirm Password"
                secureTextEntry={true}
                autoCapitalize="none"
                value = {val.conPass}
                onChangeText={(value) => setConPass(value)} 
                ></TextInput>
             </View>  */}
            <TouchableOpacity onPress={clickHandler} style={style.sign_up}>
              <Text style={style.btn_text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
