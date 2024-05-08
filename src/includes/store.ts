import {Commit, createStore} from "vuex";
import {RedditApiResponse, Post} from "../interfaces/redditTypes.ts";
import redditApi from "../api/redditApi.ts";

interface State {
    posts: Post[];
    after: string;
}

interface FetchPostsPayload {
    communityName: string;
    sortby: string;
    concatResults: boolean;
}

const store = createStore<State>({
    state: {
        posts: [],
        after: ''
    },
    mutations: {
        setPosts(state: State, posts: Post[]) {
            state.posts = posts;
        },
        setAfter(state: State, after: string) {
            state.after = after;
        }
    },
    actions: {
        async fetchPosts({ commit, state }: { commit: Commit, state: State }, payload: FetchPostsPayload) {
            const { communityName, sortby, concatResults } = payload;
            try {
                const response: RedditApiResponse = await redditApi.getPosts(communityName, sortby, state.after);

                if (concatResults) {
                    commit('setPosts', state.posts.concat(response.data.children))
                } else {
                    commit('setPosts', response.data.children);
                }

                commit('setAfter', response.data.after);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
    },
    getters: {
        posts: (state: State) => state.posts,
        after: (state: State) => state.after
    }
});

export default store;