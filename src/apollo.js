import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();
const link = new createHttpLink({
    uri: "https://movieql2.vercel.app/",
    resolvers: {
        Movie: {
            isLiked: () => false
        },
        Mutation: {
            toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
                cache.writeData({
                    id: `Movie:${id}`,
                    data: {
                        isLiked: !isLiked
                    }
                });
            }
        }
    }
});

const client = new ApolloClient({
    cache: cache,
    link: link
})

export default client;