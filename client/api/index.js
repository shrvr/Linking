import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://enigmatic-temple-22499.herokuapp.com/api';
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};
const storageKey = '_user';

export async function signUp(item) {
    try {
        const res = await fetch(`${baseUrl}/users/signUp`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: headers,
        });
        return await res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function signIn(item) {
    try {
        const res = await fetch(
            `${baseUrl}/users/signIn?` + new URLSearchParams(item),
            {
                method: 'GET',
                headers: headers,
            }
        );
        return await res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function setStorage(val) {
    try {
        await AsyncStorage.setItem(storageKey, val);
    } catch (e) {
        console.log(e);
    }
}

export async function getStorage() {
    try {
        return await AsyncStorage.getItem(storageKey);
    } catch (e) {
        console.log(e);
    }
}

export async function logout() {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log(e);
    }
}
