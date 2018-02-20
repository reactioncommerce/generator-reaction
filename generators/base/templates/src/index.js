import { GraphQLServer } from "graphql-yoga";
import { config } from "./config";
import { logger } from "./lib/logger";

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

const port = config.PORT;
const serverOptions = {
  endpoint: "/",
  subscriptions: "/",
  playground: "/",
  port,
  uploads: null
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(serverOptions, () =>
  logger.info({ port }, `Server started on port ${port}.`)
);
