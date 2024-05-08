const api = {

    get(url: string) {
        return this.request("GET", url);
    },

    async request(method: string, url: string, data = {}) {

        let params: RequestInit = {
            method: method,
            cache: "no-cache",
        };

        if (method !== "GET" && method !== "HEAD") {
            params.body = JSON.stringify(data);
        }

        try {
            let response = await fetch(url, params);
            return await response.json();

        } catch (error) {
            console.log("Error " + error);
            throw new Error();
        }
    },

};

export default api;
