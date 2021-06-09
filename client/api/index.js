export class api {
    constructor() {
        this.baseUrl = "https://enigmatic-temple-22499.herokuapp.com/api";
        this.headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };
    }

    static signUp = (item) => {
        fetch(
            `${this.baseUrl}/users/signUp`,
            {
                method: "POST",
                body: JSON.stringify(item),
                headers: this.headers
            }
        ).then(res => {
            return res.json();
        });
    }

    static signIn = (item) => {
        fetch(
            `${this.baseUrl}/users/signIn`,
            {
                method: "GET",
                body: JSON.stringify(item),
                headers: this.headers
            }
        ).then(res => {
            return res.json();
        });
    }
}