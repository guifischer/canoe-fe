import api from "./index";

// We could add the following parameters to .env
const limit = 25;
const api_url = "https://www.reddit.com";

const redditApi = {
  async getPosts(community_name: string, sort: string, after: string) {
    return await api.get(`${api_url}/r/${community_name}/${sort}.json?limit=${limit}&after=${after}`);
  },

  async getAuthor(author: string) {
    return await api.get(`${api_url}/user/${author}.json`);
  }
};

export default redditApi;
