import { GraphQLServer } from "graphql-yoga";
import { Logger } from "./logger";

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => Logger.info("Server is running on localhost:4000"));
