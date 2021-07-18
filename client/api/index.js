import AsyncStorage from '@react-native-async-storage/async-storage';
//import Toast from 'react-native-toast-message';
import Toast from 'react-native-simple-toast';

const baseUrl = 'https://enigmatic-temple-22499.herokuapp.com/api';
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};
const storageKey = '_user';

export async function GetUser() {
    try {

        const token = await getStorage();
        const res = await fetch(`${baseUrl}/users/get`, {
            method: 'GET',
            headers: {
                ...headers,
                "Authorization": "Bearer " + token
            },
        });
        return await res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function GetUserbyId(item) {
    try {

        const token = await getStorage();
        const res = await fetch(`${baseUrl}/users/get/${item}`, {
            method: 'GET',
            headers: {
                ...headers,
                "Authorization": "Bearer " + token
            },
        });
        return await res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function EditUser(item) {
    try {

        const token = await getStorage();
        const res = await fetch(`${baseUrl}/users/edit`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                ...headers,
                "Authorization": "Bearer " + token
            },
        });

        if(res.status == 200){
            Toast.show('Submitted Successfully!')
        }
        else{
            Toast.show('Submission Failed!')
        }

        return await res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function addPlace(item) {
    try {
        const token = await getStorage();
        const res = await fetch(`${baseUrl}/places/add`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                ...headers,
                "Authorization": "Bearer " + token
            },
        });
        return await res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function getAllPlaces() {
    try {
        const token = await getStorage();
        const res = await fetch(`${baseUrl}/places/all`, {
            method: 'GET',
            headers: {
                ...headers,
                "Authorization": "Bearer " + token
            },
        });
        return await res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function deletePlace(item) {
    try {
        const token = await getStorage();
        const res = await fetch(`${baseUrl}/places/delete`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                ...headers,
                "Authorization": "Bearer " + token
            },
        });
        return await res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function toggleShare(item) {
    try {
        const token = await getStorage();
        const res = await fetch(`${baseUrl}/places/toggleShare`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                ...headers,
                "Authorization": "Bearer " + token
            },
        });
        return await res.json();
    } catch (e) {
        console.log(e);
    }
}

// code for fetching list of matched users as per same trip
export async function getMatchedUsers(tripId) {
    try {
        const token = await getStorage();
        const res = await fetch(`${baseUrl}/places/usersbyTripId?_trip=${tripId}`, {
            method: 'GET',
            headers: {
                ...headers,
                "Authorization": "Bearer " + token
            },
        });
        return await res.json();
    } catch (e) {
        console.log(e);
    }
}


export async function signUp(item) {
    try {
        const res = await fetch(`${baseUrl}/users/signUp`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: headers,
        });

        if(res.status == 200){
            Toast.show('Signed Up!')
        }
        else{
            Toast.show('Signed Up Failed!')
        }

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

        if(res.status == 200){
            Toast.show('Signed In!')
        }
        else{
            Toast.show('Signed In Failed!')
        }
        
        return await res.json()
    } catch (e) {
        console.log(e);
    }
}

export async function getConversations() {
    try {
        const token = await getStorage();
        const res = await fetch(
            `${baseUrl}/conversations`,
            {
                method: 'GET',
                headers: {
                    ...headers,
                    "Authorization": "Bearer " + token
                },
            }
        );
        return await res.json();
    } catch (e) {
        console.log(e);
    }
}

export async function postConversation(item) {
    try {
        console.log("inside api")
        const token = await getStorage();
        const res = await fetch(`${baseUrl}/conversations`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                ...headers,
                "Authorization": "Bearer " + token
            },
        });
        return await res.json();
    } catch (e) {
        console.log(e);
    }
}


export async function getChats(item) {
    try {
        const token = await getStorage();
        const res = await fetch(
            `${baseUrl}/chats?` + new URLSearchParams(item),
            {
                method: 'GET',
                headers: {
                    ...headers,
                    "Authorization": "Bearer " + token
                },
            }
        );
        return await res.json();
    } catch (e) {
        console.log(e);
    }
}


export async function getLatestMessage(item) {
    try {
        const token = await getStorage();
        const res = await fetch(
            `${baseUrl}/chats/latest?` + new URLSearchParams(item),
            {
                method: 'GET',
                headers: {
                    ...headers,
                    "Authorization": "Bearer " + token
                },
            }
        );
        const msg = await res.json();
        // console.log(msg)
        return msg
    } catch (e) {
        console.log(e);
    }
}

export async function postChats(item) {
    try {
        const token = await getStorage();
        const res = await fetch(`${baseUrl}/chats`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                ...headers,
                "Authorization": "Bearer " + token
            },
        });
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
