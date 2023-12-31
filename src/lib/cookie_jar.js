class CookieJar {
    constructor() {
        this.cookies = {};
    }

    // serialize the whole jar
    serialize() {
        let cookies = Object.entries(this.cookies).map(([name,value]) => [name,value].join('='));
        return cookies.join('; ');
    }

    // parse string and add cookies to cookie var
    parse(cookies = []) {
        cookies.forEach((cookie) => {
            let parts = cookie.split(';');
            let [name, value] = parts[0].split('=');
            this.cookies[name] = value;
        })
    }

    // get cookie from jar
    get(name) {
        return this.cookies[name];
    }

    // store cookie to jar
    set(name, value) {
        this.cookies[name] = value;
    }
}

export default new CookieJar();
